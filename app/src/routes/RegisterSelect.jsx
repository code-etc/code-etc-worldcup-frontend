import React from "react";
import ImageUpload from "../components/ImagaeUpload";

const RegisterSelect = () => {
  return (
    <>
      <ImageUpload name="대신 정해주기 등록" maxImageNum={2} />
    </>
  );
};

export default RegisterSelect;
