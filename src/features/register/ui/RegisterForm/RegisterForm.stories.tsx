import type { Meta, StoryObj } from "@storybook/react-vite";

import { StoreDecorator } from "@/shared/config/storybook";

import { registerReducer } from "../../model/slice/registerSlice";
import { FormSteps } from "../../model/types/registerForm";

import { RegisterForm } from "./RegisterForm";

const meta = {
  title: "features/RegisterForm",
  component: RegisterForm,
  decorators: [StoreDecorator],

  parameters: {
    asyncReducers: {
      registerForm: registerReducer,
    },
    layout: "centered",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof RegisterForm>;

export default meta;
type Story = StoryObj<typeof meta>;

export const CredentialsStep: Story = {
  parameters: {
    initialState: {
      registerForm: {
        phone: "",
        password: "",
        isLoading: false,
        step: FormSteps.CREDENTIALS,
      },
    },
  },
};

export const CreatePasswordStep: Story = {
  parameters: {
    initialState: {
      registerForm: {
        phone: "+1234567890",
        password: "",
        isLoading: false,
        step: FormSteps.PASSWORD,
      },
    },
  },
};

export const VerificationStep: Story = {
  parameters: {
    initialState: {
      registerForm: {
        phone: "+1234567890",
        password: "123456",
        isLoading: false,
        step: FormSteps.VERIFICATION,
      },
    },
  },
};
