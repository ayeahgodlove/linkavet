import { RoleForm } from "components/admin/role/role-form.component";
import { useModalContext } from "context/app-modal.context";
import { useAuth } from "hooks/auth/auth.hook";
import { UpdateMode } from "models/shared/update-mode.enum";
import React, { useEffect } from "react";

const AdminRoleDetailPage: React.FC = () => {
  const { isLoading } = useAuth();
  const { setContent, setTitle, setShow } = useModalContext();
  
  const editRole = () => {
    setContent(<RoleForm formMode={UpdateMode.EDIT} />);
    setTitle("Edit new role");
    setShow(true);
  };

  useEffect(() => {}, [isLoading]);
  return (
    <>
      <div style={{ margin: "1rem" }}>
        <h1 style={{ padding: 30 }}> Role Edit Page</h1>
      </div>
    </>
  );
};

export default AdminRoleDetailPage;
