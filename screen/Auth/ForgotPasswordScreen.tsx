import OTPScreen from './OTPScreen';

type ForgotPasswordScreenProps = {
  email?: string;
  onBack?: () => void;
  onVerify?: (otp: string) => void;
  onResend?: () => void;
};

export default function ForgotPasswordScreen({
  email,
  onBack,
  onVerify,
  onResend,
}: ForgotPasswordScreenProps) {
  return (
    <OTPScreen
      variant="email"
      title="Forgot password"
      email={email}
      onBack={onBack}
      onVerify={onVerify}
      onResend={onResend}
    />
  );
}
