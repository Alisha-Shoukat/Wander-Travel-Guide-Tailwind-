import type { InputHTMLAttributes, TextareaHTMLAttributes } from 'react';

interface BaseFieldProps {
  id: string;
  label: string;
  errorMsg?: string;
}

interface InputFieldProps extends BaseFieldProps, InputHTMLAttributes<HTMLInputElement> {
  as?: 'input';
}

interface TextareaFieldProps extends BaseFieldProps, TextareaHTMLAttributes<HTMLTextAreaElement> {
  as: 'textarea';
}

type FormFieldProps = InputFieldProps | TextareaFieldProps;

export default function FormField(props: FormFieldProps) {
  const { id, label, errorMsg = 'Required field', as = 'input', ...rest } = props;
  const fieldClassName =
    'w-full rounded-wg-sm border border-border-muted bg-bg-main px-3.5 py-2.5 text-[0.93rem] text-text-primary transition focus:border-brand-third focus:outline-none focus:ring-2 focus:ring-[rgba(244,166,35,0.18)] dark:border-[#2a3a4a] dark:bg-[#0f1e2d] dark:text-[#f0ece4]';

  return (
    <div>
      <label className="mb-1 block text-[0.85rem] font-semibold uppercase tracking-[0.03em] text-brand-primary dark:text-brand-third" htmlFor={id}>
        {label}
      </label>
      {as === 'textarea' ? (
        <textarea
          id={id}
          className={fieldClassName}
          {...(rest as TextareaHTMLAttributes<HTMLTextAreaElement>)}
        />
      ) : (
        <input
          id={id}
          className={fieldClassName}
          {...(rest as InputHTMLAttributes<HTMLInputElement>)}
        />
      )}
      <span className="mt-1 hidden text-[0.8rem] text-brand-accent">{errorMsg}</span>
    </div>
  );
}
