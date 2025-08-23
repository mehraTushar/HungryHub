export default function InputField({ id, type = 'text', label, placeholder, register, errors, regex = '', getValues }) {
  return (
    <div className="relative mb-3">
      <label
        htmlFor={id}
        className="left-3 top-0 mb-0 max-w-[90%] origin-[0_0] truncate pt-[0.37rem] leading-[1.6] text-neutral-500 transition-all duration-200 ease-out  dark:text-neutral-400 dark:peer-focus:text-primary"
      >
        {label}
      </label>
      <input
        {...register(id, {
          required: 'This field is required',
          pattern: {
            value: regex,
            message: `Please Enter valid ${label}`,
          },
          validate: (value) => {
            if (id !== 'userConfirmPass') return;
            const { userPass } = getValues();
            console.log(userPass);
            return userPass === value || 'Passwords should match!';
          },
        })}
        type={type}
        id={id}
        placeholder={placeholder}
        className="border w-full rounded bg-transparent px-3 py-[0.32rem] leading-[1.6] dark:text-white dark:placeholder:text-neutral-300 dark:autofill:shadow-autofill"
      />

      {errors[id] && <p className="text-xs text-red-500">{errors[id].message}</p>}
    </div>
  );
}
