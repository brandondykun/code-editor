import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';

type Props = {
  label: string;
  id: string;
  checked: boolean;
  onCheckedChange: (checked: boolean) => void;
};
function SettingsCheckbox({ label, id, checked, onCheckedChange }: Props) {
  return (
    <div className="flex flex-row items-center gap-6 justify-between">
      <Label className="text-neutral-300 text-md" htmlFor={id}>
        {label}
      </Label>
      <div className="flex flex-row items-center gap-4">
        <Switch id={id} checked={checked} onCheckedChange={onCheckedChange} />
      </div>
    </div>
  );
}

export default SettingsCheckbox;
