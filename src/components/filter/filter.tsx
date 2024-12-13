import clsx from 'clsx';

export interface ChartProps {
  id?: string;
  showDropdown: boolean;
  activeFilterTab: { key: string; value: string };
  setActiveFilterTab: React.Dispatch<
    React.SetStateAction<{ key: string; value: string }>
  >;
  filterGraph: (val: string, id?: string) => Promise<void>;
  graphOptions: {
    key: string;
    value: string;
  }[];
}
export const CustomFilter = ({
  id,
  showDropdown,
  filterGraph,
  activeFilterTab,
  setActiveFilterTab,
  graphOptions,
}: ChartProps) => {
  return (
    <div
      className={clsx(
        showDropdown ? 'active' : 'inactive',
        'absolute top-[35px] right-[-1px] w-[120px] text-center bg-primary-white shadow-default rounded-md p-2 text-light-primary-black',
      )}
    >
      {graphOptions.map((option, i) => {
        const lastOpt = i === graphOptions.length - 1;
        return (
          <p
            key={i}
            className={clsx(
              activeFilterTab.key === option.key
                ? ' text-[#00368d] font-semibold'
                : 'hover:text-light-blue-main',
              !lastOpt && 'border-b',
              `py-1`,
            )}
            onClick={() => {
              if (option !== activeFilterTab) {
                setActiveFilterTab(option);
                if (id) {
                  filterGraph(option.value, id);
                } else filterGraph(option.value);
              }
            }}
          >
            {option.key}
          </p>
        );
      })}
    </div>
  );
};
