/** @format */
import { IsEmail, IsString, MaxLength, MinLength } from "class-validator";
import { createFormAtom, useFormAtom } from "compose-form-jotai";
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
  handleSubmit: async (data) => {
    console.log("Form submitted with data:", data);
    // Simulate API call with a delay
    await new Promise((resolve) => setTimeout(resolve, 1000));
    // You could perform validation or send data to a server here
  },
  initialValues: initialFormData,
  ValidatorC: UserFormValidator,
});

function App() {
  const { actions, register, formData } = useFormAtom(userFormAtom);

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
          <FormInput
            {...register("name")}
            id="name"
            type="text"
            label="Name:"
          />

          <FormInput
            id="email"
            type="email"
            label="Email:"
            {...register("email")}
          />

          <div className="form-group">
            <FormInput
              id="age"
              type="number"
              label="Age:"
              {...register("age")}
            />
          </div>

          <button type="submit">
            {formData.isSubmiting ? (
              <span className="spinner">Loading...</span>
            ) : (
              "Submit"
            )}
          </button>
          {formData.hasSubmitted &&
            !formData.isSubmiting &&
            Object.keys(formData.errors || {}).length === 0 && (
              <div className="submission-status">
                <p>Form has been submitted successfully!</p>
              </div>
            )}
        </form>

        <div className="form-data">
          <h3>Form State:</h3>
          <pre style={{ color: "#ffffff", backgroundColor: "#333333" }}>
            {JSON.stringify(formData, null, 2)}
          </pre>
        </div>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </>
  );
}

export default App;
