function createField({ title, name, icon, formik }: any) {
  return {
    title,
    name,
    icon,
    value: formik.values[name],
    error: formik.errors[name],
  };
}
