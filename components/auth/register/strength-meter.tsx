import cn from '@/utils/cn';

export const calculatePasswordStrength = (password: string) => {
  let score = 0;
  if (password?.length >= 8) score++;
  if (/[A-Z]/.test(password)) score++;
  if (/[a-z]/.test(password)) score++;
  if (/[0-9]/.test(password)) score++;
  if (/[^A-Za-z0-9]/.test(password)) score++;
  return score;
};

export const PasswordStrengthMeter: React.FC<{ strength: number }> = ({ strength }) => {
  const getStrengthColor = () => {
    switch (strength) {
      case 1:
        return 'bg-brand-red';
      case 2:
        return 'bg-brand-gold';
      case 3:
        return 'bg-brand-gold';
      case 4:
        return 'bg-brand-gold';
      case 5:
        return 'bg-brand-mint';
      default:
        return 'bg-white/50';
    }
  };

  return (
    <div className="mt-2 h-2 w-full rounded-full bg-white/50">
      <div
        className={cn('h-2 rounded-full', getStrengthColor())}
        style={{ width: `${(strength / 5) * 100}%` }}
      ></div>
    </div>
  );
};
