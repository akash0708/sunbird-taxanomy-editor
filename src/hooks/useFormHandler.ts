import { useState } from 'react';
import { SelectChangeEvent } from '@mui/material/Select';
import {
  autoFillCodeFromName,
  autoGenerateDescriptionFromName,
} from '@/utils/HelperService';

type FormChangeEvent =
  | React.ChangeEvent<HTMLInputElement>
  | React.ChangeEvent<{ value: unknown }>
  | SelectChangeEvent<string>;

interface BaseForm {
  name: string;
  code: string;
  description: string;
  [key: string]: unknown;
}

/**
 * Reusable hook for handling form state and changes
 * Eliminates code duplication between useStepCategory and useStepTerms
 */
export function useFormHandler<T extends BaseForm>(
  initialForm: T,
  autoFillOptions?: {
    enableCodeAutoFill?: boolean;
    enableDescriptionAutoFill?: boolean;
  }
) {
  const [form, setForm] = useState<T>(initialForm);

  const handleFormChange = (e: FormChangeEvent) => {
    const target = e.target as
      | HTMLInputElement
      | { name?: string; value: unknown };
    const name = target.name ?? '';
    const value = target.value;

    let updatedForm = { ...form, [name]: value };

    // Auto-fill code and description when name changes (if enabled)
    if (name === 'name' && autoFillOptions?.enableCodeAutoFill) {
      const autoFilledForm = autoFillCodeFromName(
        { name: updatedForm.name, code: updatedForm.code },
        value as string
      );
      updatedForm = { ...updatedForm, code: autoFilledForm.code };
    }

    if (name === 'name' && autoFillOptions?.enableDescriptionAutoFill) {
      updatedForm = {
        ...updatedForm,
        description: autoGenerateDescriptionFromName(value as string),
      };
    }

    setForm(updatedForm);
  };

  const resetForm = () => setForm(initialForm);

  return {
    form,
    setForm,
    handleFormChange,
    resetForm,
  };
}
