interface NavigationProps {
  logo: string;
}
export const SideNavigation = ({ logo }: NavigationProps) => {
  return <div>{logo}</div>;
};
