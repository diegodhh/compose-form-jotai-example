/** @format */

import { IsEmail, IsString, MaxLength, MinLength } from "class-validator";
import { createFormAtom, useFormAtom } from "compose-form-jotai";
import { atom } from "jotai";
import "./App.css";
import reactLogo from "./assets/react.svg";
import FormInput from "./components/FormInput";
import viteLogo from "/vite.svg";

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

// Simple validator without decorators
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

// Create a form atom with the initial data
const userFormAtom = createFormAtom<UserFormData>({
  handleSubmitAtom: atom(() => async (data) => {
    const formData = data;
    console.log("Form submitted:", formData);
  }),
  initialValues: initialFormData,
  ValidatorC: UserFormValidator,
});

function App() {
  const { formData, actions, register } = useFormAtom(userFormAtom);

  return (
    <>
      <div>
        <a href="https://vite.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>User Form Example</h1>
      <div className="card">
        <form onSubmit={actions.onSubmit}>
          <div className="form-group">
            <FormInput
              id="name"
              type="text"
              label="Name:"
              {...register("name")}
            />
            {formData.errorsTouched?.name && (
              <div className="error">{formData.errorsTouched.name}</div>
            )}
          </div>

          <div className="form-group">
            <FormInput
              id="email"
              type="email"
              label="Email:"
              {...register("email")}
            />
            {formData.errorsTouched?.email && (
              <div className="error">{formData.errorsTouched.email}</div>
            )}
          </div>

          <div className="form-group">
            <FormInput
              id="age"
              type="number"
              label="Age:"
              {...register("age")}
            />
            {formData.errorsTouched?.age && (
              <div className="error">{formData.errorsTouched.age}</div>
            )}
          </div>

          <button type="submit">Submit</button>
        </form>

        <div className="form-data">
          <h3>Form State:</h3>
          <pre>{JSON.stringify(formData, null, 2)}</pre>
        </div>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </>
  );
}

export default App;
