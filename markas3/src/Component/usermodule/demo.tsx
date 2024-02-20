"use client";
import User, { initialState } from "@/Models/User";
import Loader from "@/app/Components/Loader";
import {
  ExportUser,
  addDepartment,
  editDepartment,
  fetchData,
} from "@/redux/features/UserSlice";
import { fetchOrganizationList } from "@/redux/features/organizationSlice";
import { AppDispatch, useAppSelector } from "@/redux/store";
import { getTokenFromLocalStorage } from "@/utils/GetSetToken";
import { Button } from "@nextui-org/react";
import { useRouter } from "next/router";
import React, { SyntheticEvent, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import DesignationTable from "./next-table";
import AddForm from "./AddForm";
import { fetchRoles } from "@/redux/features/RoleSlice";
import { fetchBusinessUnitList } from "@/redux/features/RoleSlice";
import { getICDTypeList } from "@/redux/features/businessUnitSlice";
import BusinessUnit from "@/Models/BusinessUnit";
import { GetRolePermissionList } from "@/redux/features/RoleMenuItemSlice";
import { RoleMenuItem } from "@/Models/RoleMenuItem";

const Demo = () => {
  const dispatch = useDispatch<AppDispatch>();
  const [isView, setIsView] = useState<boolean>(false);
  const [loading, setLoading] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [rowAdd,setRowAdd] = useState(1);
  const currentUser = useAppSelector((store) => store.userslice.currentUser);
  const token = getTokenFromLocalStorage("jsonwebtoken");
  const [rowCount,setRowCount] = useState(0);
  const [isEdit,setIsEdit] = useState(false);
  const businessUnitList = useAppSelector(
    (store) => store.businessUnitSlice.businessUnitList
  );
  const UID = getTokenFromLocalStorage('userId')
  const BUID = getTokenFromLocalStorage('BuId')
  const rolelist = useAppSelector((store) => store.RoleSlice.RoleList);
  const [user, setUser] = useState<User>(currentUser);
  const FileName = "User"

  const handleRowAdd = () => {
    setRowAdd((prevRow) => prevRow+1);
  }
  //take the permission list 
  const permissionlist = useAppSelector((store) => store.RoleMenuItemSlice.PermissionList)


  const onclose = () => {
    setIsVisible(false);
    setUser(initialState);
    // if (id !== null) {
    //   router.push("/Dashboard/DataAdmin/Department");
    // }
    setIsView(false);
  };

  const handleExport = () => {
    dispatch(ExportUser(token,FileName))
  }
  useEffect(()=> {
    dispatch(GetRolePermissionList(token,UID,BUID))
  },[])
  // const searchParams = useSearchParams();
  // const id = searchParams.get("id");
  // console.log("id:" + id);

  useEffect(() => {
    setLoading(true);
    //dispatch(fetchData(token));
    const fetchdepartment = async () => {
      try {
        //debugger;
        
        dispatch(getICDTypeList(token));
        setLoading(false);
      } catch (error) {
        toast.error("An error occurred while fetching data");
        setLoading(false);
      }
    };
    fetchdepartment();
  }, [dispatch, token]);

  const[permissions,setPermissions] =  useState<RoleMenuItem[]>([]);

  //check the permission for this page 

  useEffect(() => {
    if(permissionlist){
      const permission = permissionlist.filter((item) => item.menuPermissionRuleMapping.menuItems?.displayName?.toUpperCase() === "USER")
      setPermissions(permission)
    }
  },[permissionlist])

  useEffect(() => {
    //debugger;
    setUser(currentUser);
  }, [currentUser]);

  

  const addDepartmentData = async (e: SyntheticEvent) => {
    e.preventDefault();

    if (user.id === 0) {
      //debugger;

      let businessUnitList = user?.businessUnitList?.map((bu) => {
        let RoleList = bu.RoleList?.map((rl) => {
          return {
            id: rl.id,
            name: "",
            roleOrder: 0,
            createdBy: "1",
            createdDate: new Date(),
            updatedBy: 1,
            updatedDate: new Date(),
            isActive: true,
          };
        });
        return {
          id: bu?.id,
          name: "",
          isDefault:bu?.isDefault,
          organization: {
            id: 0,
            name: "",
            ContactInfo: {
              AddressLine: "",
              AddressLine1: "",
              city: "",
              state: "",
              county: "",
              zip: "",
              phone: "",
              fax: "",
              createdBy: "1",
              createdDate: new Date(),
              updatedBy: 1,
              updatedDate: new Date(),
              isActive: true,
            },
            logoImagePath: "",
            Address1: "",
            Address2: "",
            city: "",
            zipcode: "",
            createdBy: "1",
            createdDate: new Date(),
            updatedBy: 1,
            updatedDate: new Date(),
            isActive: true,
          },
          RoleList:RoleList,
          address1: "",
          address2: "",
          city: "",
          zipCode: "",
          createdBy: "1",
          createdDate: new Date(),
          updatedBy: 1,
          updatedDate: new Date(),
          isActive: true,
        };
      });

      let model: User = {
        id: 0,
        firstName: user.firstName,
        lastName: user.lastName,
        userName: user.userName,
        password: user.password,
        confirmPassword: user.confirmPassword,
        email: user.email,
        // isDefault:user.isDefault,
        businessUnitList:businessUnitList,
        isSystem: true,
        displayName: "",
        token: "",
        createdBy: "1",
        createdDate: new Date(),
        updatedBy: 1,
        updatedDate: new Date(),
        isActive: true,
      };

      dispatch(addDepartment(token, model));
      dispatch(fetchData(token));
      setUser(initialState);
      setIsVisible(false);
    } else {
      let businessUnitList = user?.businessUnitList?.map((bu) => {
        let RoleList = bu.RoleList?.map((rl) => {
          return {
            id: rl.id,
            name: "",
            roleOrder: 0,
            createdBy: "1",
            createdDate: new Date(),
            updatedBy: 1,
            updatedDate: new Date(),
            isActive: true,
          };
        });
        return {
          id: bu?.id,
          name: "",
          isDefault:bu?.isDefault,
          organization: {
            id: 0,
            name: "",
            ContactInfo: {
              AddressLine: "",
              AddressLine1: "",
              city: "",
              state: "",
              county: "",
              zip: "",
              phone: "",
              fax: "",
              createdBy: "1",
              createdDate: new Date(),
              updatedBy: 1,
              updatedDate: new Date(),
              isActive: true,
            },
            logoImagePath: "",
            Address1: "",
            Address2: "",
            city: "",
            zipcode: "",
            createdBy: "1",
            createdDate: new Date(),
            updatedBy: 1,
            updatedDate: new Date(),
            isActive: true,
          },
          RoleList:RoleList,
          address1: "",
          address2: "",
          city: "",
          zipCode: "",
          createdBy: "1",
          createdDate: new Date(),
          updatedBy: 1,
          updatedDate: new Date(),
          isActive: true,
          
        };
      });
      let model: User = {
        id: user.id,
        firstName: user.firstName,
        lastName: user.lastName,
        userName: user.userName,
        password: user.password,
        
        email: user.email,
        businessUnitList: businessUnitList,
        //roleList: rolelist,
        isActive: user.isActive,
        createdBy: user.createdBy,
        createdDate: user.createdDate,
        updatedBy: user.updatedBy,
        updatedDate: user.updatedDate,
        isSystem: user.isSystem,
        displayName: user.displayName,
        confirmPassword: user.confirmPassword,
        token: user.token,
      };
      dispatch(editDepartment(token, model));
      // router.push("/Dashboard/DataAdmin/User");
      setUser(initialState);
      setIsVisible(false);
    }
  };
  const renderButtons = () => {
    const buttons = [];
  
    // Check for INSERT permission
    const insertPermission = permissions.find(
      (item) => item.menuPermissionRuleMapping.permissionRule!.name?.toUpperCase() === "INSERT"
    );
    if (insertPermission) {
      buttons.push(
        <Button
          key="addButton"
          // variant={"outline"}
          size={'sm'}
          onClick={() => setIsVisible(true)}
          className="px-5   bg-green-600 hover:bg-green-800 text-white"
        >
          Add
        </Button>
      );
    }
  
    // Check for EXPORT permission
    const exportPermission = permissions.find(
      (item) => item.menuPermissionRuleMapping.permissionRule!.name?.toUpperCase() === "EXPORT"
    );
    if (exportPermission) {
      buttons.push(
        <Button
          key="exportButton"
          //variant={"outline"}
          size={"sm"}
          onClick={handleExport}
          className="px-5  bg-blue-500 hover:bg-blue-800 text-white"
        >
          Export
        </Button>
      );
    }
  
    return buttons;
  };

  return loading ? (
    <Loader />
  ) : (
    <>
      <AddForm
        visible={isVisible}
        isEdit = {isEdit}
        onClose={onclose}
        handleSaveChanges={addDepartmentData}
        data={user}
        businessUnitList={businessUnitList}
        setData={setUser} // Changed 'setDiagnosisType' to 'setDepartment'
        isView={isView}
        permissions = {permissions}
      />
      <div className="grid grid-cols-1 mr-10">
      <div className="grid grid-cols-10 my-5 mx-5 gap-1">
          <h1 className="col-start-1 col-end-5 text-2xl">USER</h1>
         
          <div className="col-span-2 col-end-11  md:flex md:flex-row-reverse gap-1">
            {renderButtons()}
          </div>
        </div>
        <DesignationTable
          setUser={setUser}
          setIsView={setIsView}
          setIsVisible={setIsVisible}
          setIsEdit={setIsEdit}
          permissions = {permissions}
        />
      </div>
    </>
  );
};

export default Demo;
