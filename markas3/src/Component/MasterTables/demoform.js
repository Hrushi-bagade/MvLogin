"use client";
import React, {useEffect, useState } from "react";
import ProcedureCodeOrganizationBUWiseTable from "./next-table";
import { Button } from "@/components/ui/button";
import AddEditForm from "./AddEditForm";
import { AppDispatch, useAppSelector } from "@/redux/store";
import ProcedureCodeOrganizationBUWise from "@/Models/ProcedureCodeOrganizationBUWise";
import { toggleOpen } from "@/redux/features/menuSlice";
import { useDispatch } from "react-redux";
import { Bars3Icon } from "@heroicons/react/20/solid";
import Loader from "@/app/Components/Loader";
import { RoleMenuItem } from "@/Models/RoleMenuItem";
import { getTokenFromLocalStorage } from "@/utils/GetSetToken";
import { GetRolePermissionList } from "@/redux/features/RoleMenuItemSlice";
import { ExportPCOragnizationBuWise } from "@/redux/features/ProcedureCodeOrganizationBUWiseSlice";
const DemoForm = () => {
  const [loading, setLoading] = useState(true);
  const [isVisible, setIsVisible] = useState(false);
  const isMenuOpen = useAppSelector((store) => store.menuSlice.isMenuOpen);
  const [isView, setIsView] = useState(false);
  const BUID = getTokenFromLocalStorage('BuId');
  const userId = getTokenFromLocalStorage('userId');
  const  [permissions,setPermissions]=useState<RoleMenuItem[]>([])
  const [refresh,setRefresh]=useState(1);  //Counter variable  after add edit delete action
  const token =getTokenFromLocalStorage("jsonwebtoken")
  const Filename="Procedure Code Organization BuWise";
  const BuName= getTokenFromLocalStorage("BuName");
  const filename = Filename+" "+BuName;

  const dispatch = useDispatch<AppDispatch>();
  const toggleClick = () => {
    dispatch(toggleOpen());
  };
  const currentPCOB = useAppSelector(
    (store) =>
      store.ProcedureCodeOrganizationBUWiseSlice
        .currentProcedureCodeOrganizationBUWise
  );
  const permissionList=useAppSelector((store)=>store.RoleMenuItemSlice.PermissionList)

  const [PCOB, setPCOB] =
    useState<ProcedureCodeOrganizationBUWise>(currentPCOB);
  
    useEffect(() => {
      dispatch(GetRolePermissionList(token, userId, BUID))
    }, []);
  
  useEffect(() => {
    setPCOB(currentPCOB);
  }, [currentPCOB]);

  setTimeout(() => {
    setLoading(false);
  }, 1000);

  useEffect(()=>{
    if(permissionList){
      const permission =permissionList.filter((item)=>item.menuPermissionRuleMapping.menuItems?.displayName?.toUpperCase() =="PROCEDURE CODE ORGANIZATION BUWISE");
      setPermissions(permission);
      // console.log("Permission " ,permission)
      // console.log("PermissionList" ,permissionList)
    }
  },[permissionList])

  const handleDownload=()=>{    ///handleDownload function to dispatch Export from redux  depatment slice
    dispatch(ExportPCOragnizationBuWise(token,filename as string,BUID))
  }
   
  const rendorButtons = () => {
    //Function to render Add Export according to permission
    const buttons = [];
    // Check for INSERT permission
    const InsertPermission = permissions.find((item) =>
      item.menuPermissionRuleMapping.permissionRule?.name?.toUpperCase() ==="INSERT"
    );
    // console.log("Inser Permisssion",InsertPermission)
    if (InsertPermission) {
      buttons.push(
        <Button
          key="addButton"
          variant={"outline"}
          size={"sm"}
          onClick={() => setIsVisible(true)}
          className="px-5   bg-green-600 hover:bg-green-800 text-white"
        >
          Add
        </Button>
      );
      //Check for Export Permission
      const ExportPermission = permissions.find((item) => 
        item.menuPermissionRuleMapping.permissionRule?.name?.toUpperCase() ===
          "EXPORT"
      );
      // console.log("EXport Permisssion",ExportPermission)
      if (ExportPermission) {
        buttons.push(
          <Button
            key="exportButton"
            variant={"outline"}
            size={"sm"}
            onClick={handleDownload}
            className="px-5 bg-blue-500 hover:bg-blue-800 text-white "
          > Export
          </Button>
        );
      }
    }
    return buttons;
  };

  return (loading?(<Loader/>):
    <>
      <button
        onClick={toggleClick}
        className={` ${isMenuOpen ? "hidden" : ""}`}
      >
        <Bars3Icon height={20} width={20} className="m-5"></Bars3Icon>{" "}
      </button>
      <AddEditForm
        visible={isVisible}
        setVisible={setIsVisible}
        setData={setPCOB}
        data={PCOB}
        isView={isView}
        setIsView={setIsView}
        permissions={permissions}
        setRefresh={setRefresh}
      />
      <div className="grid grid-cols-1 mr-10">
        <div className="grid grid-cols-10 my-10 mx-5">
          <h1 className="col-start-1 col-end-9 text-4xl">Procedure Code Organization Business Unit Wise</h1>
          <div className="col-span-2 col-end-11  md:flex md:flex-row-reverse gap-1">
              {rendorButtons()}
            </div>
        </div>
        <ProcedureCodeOrganizationBUWiseTable
          setIsVisible={setIsVisible}
          setData={setPCOB}
          permissions={permissions}
          setRefresh={setRefresh}
          refresh={refresh}
        />
      </div>
    </>
  );
};
export default DemoForm;
