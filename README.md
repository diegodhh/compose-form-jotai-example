<!-- @format -->

# compose-form-jotai Example

A React + TypeScript + Vite example showing how to use the compose-form-jotai library for form management.

## About compose-form-jotai

`compose-form-jotai` is a form management library built on top of [Jotai](https://jotai.org/) that lets you create type-safe, modular form state through composition.

Key features:

- **Type-safe**: Form values, errors, and actions are fully typed
- **Validation Support**: Built-in integration with class-validator
- **React Integration**: Easy to use with React components

## Usage Guide

### 1. Installation

```bash
npm install compose-form-jotai class-validator
# or
yarn add compose-form-jotai class-validator
```

### 2. Define your form data structure

```tsx
// Define the form data structure
interface UserFormData {
  name: string;
  email: string;
  age: number;
}

// Create the initial form state
const initialFormData: UserFormData = {
  name: "",
  email: "",
  age: 0,
};
```

### 3. Create a validator class

Use class-validator decorators to define validation rules:

```tsx
import { IsEmail, IsString, MaxLength, MinLength } from "class-validator";

class UserFormValidator {
  @IsString()
  @MinLength(2)
  name!: string;

  @IsEmail()
  email!: string;

  @IsString()
  @MaxLength(2)
  age!: number;
}
```

### 4. Create a form atom

```tsx
import { createFormAtom } from "compose-form-jotai";
import { atom } from "jotai";

const userFormAtom = createFormAtom<UserFormData>({
  handleSubmitAtom: atom(() => async (data) => {
    console.log("Form submitted with data:", data);
    // Simulate API call with a delay
    await new Promise((resolve) => setTimeout(resolve, 1000));
    // You could perform validation or send data to a server here
  }),
  initialValues: initialFormData,
  ValidatorC: UserFormValidator,
});
```

### 5. Use the form atom in your components

```tsx
import { useFormAtom } from "compose-form-jotai";

function UserForm() {
  const { actions, register, formData } = useFormAtom(userFormAtom);

  return (
    <form onSubmit={actions.onSubmit}>
      <FormInput {...register("name")} id="name" type="text" label="Name:" />

      <FormInput
        id="email"
        type="email"
        label="Email:"
        {...register("email")}
      />

      <FormInput id="age" type="number" label="Age:" {...register("age")} />

      <button type="submit">
        {formData.isSubmiting ? "Loading..." : "Submit"}
      </button>

      {formData.hasSubmitted &&
        !formData.isSubmiting &&
        Object.keys(formData.errors || {}).length === 0 && (
          <div className="submission-status">
            <p>Form has been submitted successfully!</p>
          </div>
        )}
    </form>
  );
}
```
