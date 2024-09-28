import { useUser } from '@/context/AppContext';
import {
  MutationErrorPayload,
  changeAdminRole,
  AddAdmins,
} from '@/types/types';
import { useState } from 'react';
import { toast } from 'sonner';

export const useTeamMembers = () => {
  const { token } = useUser();
  const [teamMembers, setTeamMembers] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const [updateMemberModal, setUpdateMemberModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [newRole, setNewRole] = useState('');
  const [email, setEmail] = useState('');

  const getTeamMembers = async () => {
    setIsLoading(true);
    try {
      const data = await fetch(
        `${import.meta.env.VITE_API_BASE_URL}admin/settings/team-members`,
        {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${token}`,
            Accept: 'application/json',
          },
        },
      );
      const res = await data.json();
      setIsLoading(false);
      if (res?.error) {
        toast.error(res?.message);
      } else setTeamMembers(res.admin_data);
    } catch (err) {
      toast.error((err as MutationErrorPayload)?.data?.message);
    }
  };

    const changeAdminRole = async (values: changeAdminRole) => {
    try {
      setLoading(true);
      const data = await fetch(
        `${import.meta.env.VITE_API_BASE_URL}admin/settings/change-admin-role`,
        {
          method: 'PATCH',
          headers: {
            'content-type': 'application/json',
            Accept: 'application/json',
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            email: values.email,
            new_role: values.new_role,
          }),
        },
      );
      const res = await data.json();
      setLoading(false);
      if (res?.error) {
        setUpdateMemberModal(false);
        toast.error(res?.message);
      } else {
        setUpdateMemberModal(false);
        await getTeamMembers();
        toast.success(res?.message);
      }
    } catch (err) {
      toast.error((err as MutationErrorPayload)?.data?.message);
    }
  };

  return { 
    getTeamMembers, 
    teamMembers, 
    isLoading, 
    setIsLoading,     
    changeAdminRole,
    loading,
    setLoading,
    updateMemberModal,
    setUpdateMemberModal,
    newRole,
    setNewRole,
    email,
    setEmail
  };
  
};


export const useAddMembers = () => {
  const [loading, setisLoading] = useState(false);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [isValidMail, setIsValidMail] = useState(false);
  const [selectedRole, setSelectedRole] = useState('Admin');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { token } = useUser();

  const handleAddMembers = async (values: AddAdmins) => {
    try {
      setisLoading(true);
      const data = await fetch(
        `${import.meta.env.VITE_API_BASE_URL}admin/admin-register`,
        {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${token}`,
            'content-type': 'application/json',
            Accept: 'application/json',
          },
          body: JSON.stringify({
            user_name: values.userName,
            email: values.email,
            role: values.selectedRole,
          }),
        },
      );

      const response = await data.json();
      setisLoading(false);
      if (response?.error) {
        if (response?.message.includes('SQLSTATE[23000]')) {
          toast.warning('User with email already exist');
        } else toast.error(response.message);
      } else {
        setIsModalOpen(true);
        setFirstName('');
        setLastName('');
        setEmail('');
        setSelectedRole('Admin');
      }
    } catch (error) {
      toast.error((error as MutationErrorPayload)?.data?.message);
    }
  };

  return {
    handleAddMembers,
    loading,
    firstName,
    setFirstName,
    lastName,
    setLastName,
    email,
    setEmail,
    isValidMail,
    setIsValidMail,
    selectedRole,
    setSelectedRole,
    isModalOpen,
    setIsModalOpen,
  };
};
