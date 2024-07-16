export const firstOptions = [
  { label: 'Excellent', value: 45, color: '#5856D6' },
  { label: 'Good', value: 35, color: '#F09436' },
  { label: 'Fair', value: 15, color: '#5CC8BE' },
  { label: 'Poor', value: 5, color: '#F7CB45' },
];

export const secondOptions = [
  { label: 'Yes', value: 70, color: '#AF52DE' },
  { label: 'No', value: 30, color: '#5CC8BE' },
];

export const thirdOptions = [
  {
    label: 'Male',
    value: 70,
    color: '#EA3354',
    age: {
      label: 'Age',
      ranges: [
        { label: '(18-25)', value: 15 },
        { label: '(26-35)', value: 25 },
        { label: '(36-45)', value: 10 },
        { label: '(46-Above)', value: 20 },
      ],
    },
  },
  {
    label: 'Female',
    value: 30,
    color: '#357AF6',
    age: {
      label: 'Age',
      ranges: [
        { label: '(18-25)', value: 15 },
        { label: '(26-35)', value: 25 },
        { label: '(36-45)', value: 10 },
      ],
    },
  },
];
