export const SettingsHeader = ({ title }: { title: string }) => (
  <div className="sticky top-0 w-full flex flex-col gap-3 z-1 bg-background-light-surface-3 dark:bg-background-dark-surface-3 p-3 rounded-full">
    <h1 className="text-2xl">{title}</h1>
  </div>
);
