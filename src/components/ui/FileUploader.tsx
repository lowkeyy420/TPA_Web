import { useAxiosPost } from "@/hooks/useAxiosPost";
import axios from "axios";
import { useEffect, useState } from "react";

import style from "../styles/Action.module.scss";

interface MyProps {
  email: string | undefined;
  setUploadStatus: any;
  reload: boolean;
  product?: boolean;
  add?: boolean;
  update?: boolean;
  name?: string;
}

function FileUpload({
  email,
  setUploadStatus,
  reload,
  product,
  add,
  update,
  name,
}: MyProps) {
  const [file, setFile] = useState<any>();
  const [fileIsSelected, setFileIsSelected] = useState(false);

  let storageURL: any =
    process.env.STORAGE_URL + "shop%2F" + email + "%2Fimage";

  if (product) {
    storageURL =
      process.env.STORAGE_URL +
      "product%2F" +
      email +
      "%2F" +
      name +
      "%2Fimage";
  }

  useEffect(() => {
    if (reload) {
      uploadHandler();
    }
  }, [reload]);

  function changeHandler(e: any) {
    setFile(e.target.files[0]);
    setFileIsSelected(true);
    if (!e.target.files[0]) {
      setFileIsSelected(false);
    }
  }

  function uploadHandler() {
    const formData = new FormData();
    formData.append("image", file);

    console.log("UPLOADING...");

    axios({
      method: "POST",
      url: storageURL,
      data: formData,
      headers: { "Content-Type": "multipart/form-data" },
    })
      .then((res: any) => {
        setUploadStatus("");
        if (add) {
          setUploadStatus("Success Add");
        } else if (update) {
          setUploadStatus("Success Update");
        } else {
          setUploadStatus("Success");
        }
      })
      .catch((err: any) => {
        setUploadStatus("Error");
      });
  }

  return (
    <div>
      <input type="file" name="file" onChange={changeHandler} required />
    </div>
  );
}

export default FileUpload;
