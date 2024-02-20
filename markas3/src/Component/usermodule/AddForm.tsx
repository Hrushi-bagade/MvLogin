import User from "@/Models/User";
import BusinessUnit, { businessUnitInitialState } from "@/Models/BusinessUnit";
import React, { SyntheticEvent, useEffect, useState } from "react";
import Select from "react-select";
//import ReactSelectDropdown from "@/Models/React-Select-Dropdown";
import { XMarkIcon } from "@heroicons/react/20/solid";
import { useDispatch } from "react-redux";
import { AppDispatch, useAppSelector } from "@/redux/store";
import { fetchRoles } from "@/redux/features/RoleSlice";
import ReactSelectDropdown from "@/Models/React-Select-Dropdown";
import { getTokenFromLocalStorage } from "@/utils/GetSetToken";
import { getMenuByUserId } from "@/redux/features/menuItemSlice";
import {
  getICDTypeList,
  userBuIdList,
} from "@/redux/features/businessUnitSlice";
import Role from "@/Models/Role";
import { toast } from "react-toastify";
import { RoleMenuItem } from "@/Models/RoleMenuItem";

type AddFormProps = {
  visible: boolean;
  isEdit: boolean;
  onClose: () => void;
  handleSaveChanges: (e: SyntheticEvent) => void;
  setData: React.Dispatch<React.SetStateAction<User>>;
  data: User;
  businessUnitList: BusinessUnit[];
  isView: boolean;
  permissions: RoleMenuItem[];
};

const AddForm = ({
  visible,
  isEdit,
  onClose,
  handleSaveChanges,
  data,
  businessUnitList,
  setData,
  isView,
  permissions,
}: AddFormProps) => {
  interface MenuItem {
    title: string;
    content: string;
  }

  interface Dropdown {
    title: string;
    items: MenuItem[];
  }
  const dispatch = useDispatch<AppDispatch>();
  const token = getTokenFromLocalStorage("jsonwebtoken");
  const userId = getTokenFromLocalStorage("userId");
  const menuItems = useAppSelector((store) => store.menuItemSlice.data);
  const RoleDataList = useAppSelector((store) => store.RoleSlice.RoleList);
  const UserBuIdList = useAppSelector(
    (store) => store.businessUnitSlice.businessUnitList
  );
  useEffect(() => {
    try {
      dispatch(getICDTypeList(token));
    } catch (error) {}
  }, [token, dispatch]);



  // useEffect(() => {
  //   c
  // })

  //check the user have the edit permission
  const [dynamicColor, setDynamicColor] = useState("#3498db");
  const changeDynamicColor = () => {
    const newColor = "#e74c3c"; // Replace this with your dynamic color calculation
    setDynamicColor(newColor);
  };
  const handleBuState = (
    selectedOptions: any,
    rowIndex: number
  ) => {
    //spreading the data state
    const updatedData = { ...data };
    //creating the copy of the existing businessUnitList array or created the empty array
    const buList = Array.isArray(updatedData.businessUnitList)
      ? [...updatedData.businessUnitList]
      : [];
    //store the selected Options in one variable
    const selectedBusinessUnit = {
      id: parseInt(selectedOptions?.value as string),
      name: selectedOptions?.label as string,
      RoleList: [],
    };
    //store the selected option's value in the copy array
    buList[rowIndex] = selectedBusinessUnit;
    //filled that copied array in the data.businessUnitList
    updatedData.businessUnitList = buList;
    //finally, set the businessUnitList
    setData(updatedData);
  };
  const [defaultBuIndex, setDefaultBuIndex] = useState<number>(-1);
  // const handleRoleeState = (selectedRole: any, rowIndex: number) => {

  //   console.log("selectedRole", selectedRole);

  //   const newData = data.businessUnitList!.map((item: any, index: number) => {
  //     if (index == rowIndex) {
  //       console.log("index", index);
  //       return {
  //         ...item,
  //         RoleList: selectedRole?.map((roleItem: any, index: number) => {
  //           return {
  //             id: parseInt(roleItem?.id as string),
  //             name: roleItem?.n ame as string,
  //           };
  //         }),
  //       };
  //     }
  //     return item;
  //   });
  //   setData((prevData: any) => {
  //     return { ...prevData, businessUnitList: newData };
  //   });

  //   // const businessDemo = {...data.businessUnitList}
  //   // const selectedRoleList = selectedRole.map((option:any) => {
  //   //   return{
  //   //     id:parseInt(option?.value as string),
  //   //     name:option?.label as string,
  //   //     RoleOrder:[]
  //   //   }
  //   // })

  //   //setData(updatedRoles);
  //   console.log("data after function", data);
  // };
  const handleRoleeState = (selectedRole: any, rowIndex: number) => {

    const newData = data.businessUnitList!.map((item: any, index: number) => {
      if (index === rowIndex) {
        return {
          ...item,
          RoleList: selectedRole?.map((roleItem: any, index: number) => {
            return {
              id: parseInt(roleItem?.id as string),
              name: roleItem?.name as string,
            };
          }),
        };
      }
      return item;
    });

    // Update the first row differently
    if (rowIndex === 0) {
      setData((prevData: any) => ({
        ...prevData,
        businessUnitList: [
          {
            ...newData[0],
          },
          ...newData.slice(1), // Keep other rows unchanged
        ],
      }));
    } else {
      setData((prevData: any) => ({
        ...prevData,
        businessUnitList: newData,
      }));
    }

  };

  //Deleteing the businessUnit and role lists from state  when click on the delete function
  const handleDeletebuRole = (rowIndex: number) => {
    const updatedData = { ...data };

    const buList = Array.isArray(updatedData.businessUnitList)
      ? [...updatedData.businessUnitList]
      : [];

    buList.splice(rowIndex, 1);

    updatedData.businessUnitList = buList;

    setData(updatedData);
    handleDeleteRow(rowIndex);
  };

  
  const handleIsdefault = (e: any, index: number) => {
    setData((prevData: any) => {
      const updatedBusinessUnitList = prevData.businessUnitList.map(
        (bu: any, i: number) => {
          return {
            ...bu,
            isDefault: i === index && e.target.checked ? 1 : 0,
          };
        }
      );

      // Check if the user is trying to set another business unit as default
      const isAnotherDefaultSelected = updatedBusinessUnitList.some(
        (bu: any, i: number) => i !== index && bu.isDefault === 1
      );

      if (isAnotherDefaultSelected) {
        // Display toast message or handle the scenario as needed
        toast.error(
          "Cannot set another business unit as default. Deselect the other business unit first."
        );

        // Revert the changes
        return prevData;
      }

      // Check if no business unit is selected as default
      const isNoDefaultSelected = updatedBusinessUnitList.every(
        (bu: any) => bu.isDefault === 0
      );

      if (isNoDefaultSelected) {
        // Clear the state when no business unit is selected as default
        toast.success(
          "Clearing state as no business unit is selected as default."
        );
        return {
          ...prevData,
          businessUnitList: updatedBusinessUnitList,
        };
      }

      return {
        ...prevData,
        businessUnitList: updatedBusinessUnitList,
      };
    });
  };

  const handleBuDropDown = (e: any, index: number) => {
    dispatch(fetchRoles(token, e?.value?.toString()!));

    // Update the first row differently
    if (index === 0) {
      setData((prevData: any) => ({
        ...prevData,
        businessUnitList: [
          {
            id: parseInt(e?.value as string),
            name: e?.label as string,
            RoleList: [], // or provide default RoleList as needed
          },
          ...(prevData.businessUnitList || []).slice(1), // Keep other rows unchanged
        ],
      }));
    } else {
      setData((prevData: any) => ({
        ...prevData,
        businessUnitList: [
          ...(prevData.businessUnitList || []).slice(0, index),
          {
            id: parseInt(e?.value as string),
            name: e?.label as string,
            RoleList: [], // or provide default RoleList as needed
          },
          ...(prevData.businessUnitList || []).slice(index + 1), // Keep other rows unchanged
        ],
      }));
    }
  };

  let selectedRole: ReactSelectDropdown = {
    value: "",
    label: "",
  };

  let selectedUserBuId: ReactSelectDropdown = {
    value: "",
    label: "",
  };

  // useEffect(() => {
  //   if(data && data.businessUnitList && data.businessUnitList[index])
  // },[data, rowCount])

  const [roleDefaultValue, setRoleDefaultValue] = useState<
    ReactSelectDropdown[]
  >([]);
  useEffect(() => {
    if (RoleDataList.length > 0 && data.id == 0) {
      selectedRole.value = RoleDataList[0].id.toString();
      selectedRole.label = RoleDataList[0].name;
    }
    if (UserBuIdList.length > 0 && data.id == 0) {
      selectedUserBuId.value = RoleDataList[0]?.id.toString();
      selectedUserBuId.label = RoleDataList[0]?.name;
    }

    if (
      data &&
      data.businessUnitList &&
      data.businessUnitList[rowCount] &&
      data.businessUnitList[rowCount].RoleList
    ) {
      const mappedRole = data.businessUnitList[rowCount].RoleList;
      const ito = mappedRole?.map((x) => ({
        value: x.id.toString(),
        label: x.name,
      })) as ReactSelectDropdown[];
      setRoleDefaultValue(ito);
    } else {
      setRoleDefaultValue([]);
    }
  }, [RoleDataList]);

  let RoleDropDownList: ReactSelectDropdown[] = [];
  let UserBuIdDropDownList: ReactSelectDropdown[] = [];

  if(RoleDataList != null){
  RoleDataList.map((x) => {
    RoleDropDownList.push({ value: x.id.toString(), label: x.name });
  });
  }
  if(UserBuIdList!=null){
  UserBuIdList.map((y) => {
    UserBuIdDropDownList.push({ value: y.id?.toString()!, label: y.name! });
  });
}


  let finalArray = [] as any;
  const finalState = () => {
    let lengty = data.businessUnitList!.length;
    const selectedarrays = data.businessUnitList;
    finalArray = finalArray.concat(selectedarrays);
  };

  const [rowCount, setRowCount] = useState(1);
  //for useEffect for rowCount
  useEffect(() => {
    const len = data.businessUnitList?.length;
    if (len! > 0) {
      setRowCount(len!);
    } else {
      setRowCount(1);
    }
  });

  let selectedRoleList: ReactSelectDropdown[] = [];

  useEffect(() => {
    if (
      data &&
      data.businessUnitList &&
      data.businessUnitList[rowCount] &&
      data.businessUnitList[rowCount].RoleList
    ) {
    }
  }, [data]);

  const blist = data.businessUnitList?.length;

  const handleRowAdd = () => {
    setData((prevData: any) => ({
      ...prevData,
      businessUnitList: [
        ...(prevData.businessUnitList || []),
        {
          id: null,
          name: "",
          RoleList: [],
        },
      ],
    }));
  };

  const [errors, setErrors] = useState({
    firstName: "",
    lastName: "",
    userName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const validateForm = () => {
    let isValid = true;
    const newErrors = {
      firstName: "",
      lastName: "",
      userName: "",
      email: "",
      password: "",
      confirmPassword: "",
    };

    if (!data.firstName?.trim()) {
      newErrors.firstName = "First Name is Required";
      isValid = false;
    }

    if (!data.lastName?.trim()) {
      newErrors.lastName = "Last Name is required";
      isValid = false;
    }

    if (!data.userName.trim()) {
      newErrors.userName = "User Name is required";
      isValid = false;
    }

    // const passwordRegex = /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d).{6,8}$/;

    // if (!data.password.trim()) {
    //   newErrors.password = "Password is required";
    //   isValid = false;
    // } else if (!passwordRegex.test(data.password)) {
    //   newErrors.password =
    //     "Password must have at least one uppercase letter, one lowercase letter, and one digit. Length should be between 6 and 8 characters.";
    //   isValid = false;
    // }

    // const emailFormat = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    // if (!data.email?.trim()) {
    //   newErrors.email = "Email is Required";
    //   isValid = false;
    // } else if (!emailFormat.test(data.email)) {
    //   newErrors.email = "Invalid Email Format";
    //   isValid = false;
    // }

    // if (!data.confirmPassword?.trim()) {
    //   newErrors.confirmPassword = "Confirm Password is required";
    //   isValid = false;
    // }

    setErrors(newErrors);
    return isValid;
  };

  const handleValidationChanges = (e: any) => {
    const isValid = validateForm();
    if (isValid) {
      handleSaveChanges(e);
    } else {
      toast.error("Form contains validation errors");
    }
  };

  const handleDeleteRow = (indexToDelete: number) => {
    setRowCount((prevCount) => prevCount - 1);
    // You might want to update state/data accordingly here
  };

  const edit = permissions.some(
    (item) =>
      item.menuPermissionRuleMapping.permissionRule?.name?.toUpperCase() ===
      "UPDATE"
  );

  return (
    <div>
      <form>
        {visible && (
          <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-opacity-75 bg-gray-500 overflow-auto"
            aria-hidden="true"
            role="dialog"
            tabIndex={-1}
            aria-labelledby="partialViewModalLabel"
            data-backdrop="static"
          >
            <div className="modal-dialog note-modal-form my-auto">
              <div className="modal-content animated fadeIn modal-dialog-center">
                <div className="relative bg-popup p-4 rounded-lg shadow-lg max-w-6xl w-full">
                  <div className="flex border-b border-gray-700">
                    <div className="flex-1 text-center text-white">
                      <h1 className="font-bold text-3xl p-2 m-2 text-[var(--neutral90)]">
                        Add Details
                      </h1>
                    </div>
                    <div className="text-right">
                      <XMarkIcon
                        color="var(--neutral90)"
                        className="w-10 h-10 transition ease-in-out hover:-rotate-90 text-[var(--neutral90)]"
                        onClick={() => {
                          onClose();
                          setRowCount(0);
                          setErrors({
                            firstName: "",
                            lastName: "",
                            userName: "",
                            email: "",
                            password: "",
                            confirmPassword: "",
                          });
                        }}
                      ></XMarkIcon>
                    </div>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 gap-4 py-8 px-8">
                    <div className="grid grid-cols-2 items-center">
                      <label
                        htmlFor="ProcedureCode"
                        className="col-span-1 text-left"
                      >
                        First Name
                      </label>
                      <input
                        type="text"
                        id="ProcedureCode"
                        value={data.firstName}
                        onChange={(e) =>
                          setData({ ...data, firstName: e.target.value })
                        }
                        className={`col-span-3 px-2 py-1 border rounded focus:outline-none focus:border-2 focus:border-borderfocus${
                          errors.firstName ? "border-red-500" : ""
                        }`}
                        disabled={!(edit || data.id === 0)}
                      />
                      {errors.firstName && (
                        <p className="text-red-500 text-sm">
                          {errors.firstName}
                        </p>
                      )}
                    </div>
                    <div className="grid grid-cols-2 items-center">
                      <label
                        htmlFor="ProcedureCode"
                        className="col-span-1 text-left"
                      >
                        Last Name
                      </label>
                      <input
                        type="text"
                        id="ProcedureCode"
                        value={data.lastName}
                        onChange={(e) =>
                          setData({ ...data, lastName: e.target.value })
                        }
                        disabled={!(edit || data.id === 0)}
                        className={`col-span-3 px-2 py-1 border rounded focus:outline-none focus:border-2 focus:border-borderfocus ${
                          errors.lastName ? "border-red-500" : ""
                        }`}
                      />
                      {errors.lastName && (
                        <p className="text-red-500 text-sm">
                          {errors.lastName}
                        </p>
                      )}
                    </div>
                    <div className="grid grid-cols-2 items-center">
                      <label
                        htmlFor="ProcedureCode"
                        className="col-span-1 text-left"
                      >
                        User Name
                      </label>
                      <input
                        type="text"
                        id="ProcedureCode"
                        value={data.userName}
                        onChange={(e) =>
                          setData({ ...data, userName: e.target.value })
                        }
                        disabled={!(edit || data.id === 0)}
                        className={`col-span-3 px-2 py-1 border rounded focus:outline-none focus:border-2 focus:border-borderfocus ${
                          errors.userName ? "border-red-500" : ""
                        }`}
                      />
                      {errors.userName && (
                        <p className="text-red-500 text-sm">
                          {errors.userName}
                        </p>
                      )}
                    </div>
                    <div className="grid grid-cols-2 items-center">
                      <label
                        htmlFor="ProcedureCode"
                        className="col-span-1 text-left"
                      >
                        Email
                      </label>
                      <input
                        type="text"
                        id="ProcedureCode"
                        value={data.email}
                        onChange={(e) =>
                          setData({ ...data, email: e.target.value })
                        }
                        disabled={!(edit || data.id === 0)}
                        className={`col-span-3 px-2 py-1 border rounded focus:outline-none focus:border-2 focus:border-borderfocus ${
                          errors.email ? "border-red-500" : ""
                        }`}
                      />
                      {errors.email && (
                        <p className="text-red-500 text-sm">{errors.email}</p>
                      )}
                    </div>

                    <div className="grid grid-cols-2 items-center">
                      <label
                        htmlFor="ProcedureCode"
                        className="col-span-1 text-left"
                      >
                        Password
                      </label>
                      <input
                        type="password"
                        id="ProcedureCode"
                        value={data.password}
                        onChange={(e) =>
                          setData({ ...data, password: e.target.value })
                        }
                        className={`col-span-3 px-2 py-1 border rounded focus:outline-none focus:border-2 focus:border-borderfocus ${
                          errors.password ? "border-red-500" : ""
                        }`}
                        disabled={!(edit || data.id === 0)}
                      />
                      {errors.password && (
                        <p className="text-red-500 text-sm">
                          {errors.password}
                        </p>
                      )}
                    </div>
                    <div className="grid grid-cols-2 items-center">
                      <label
                        htmlFor="ProcedureCode"
                        className="col-span-1 text-left"
                      >
                        Confirm Password
                      </label>
                      <input
                        type="password"
                        id="ProcedureCode"
                        value={data.confirmPassword}
                        onChange={(e) =>
                          setData({
                            ...data,
                            confirmPassword: e.target.value,
                          })
                        }
                        disabled={!(edit || data.id === 0)}
                        className={`col-span-3 px-2 py-1 border rounded focus:outline-none focus:border-2 focus:border-borderfocus ${
                          errors.confirmPassword ? "border-red-500" : ""
                        }`}
                      />
                      {errors.confirmPassword && (
                        <p className="text-red-500 text-sm">
                          {errors.confirmPassword}
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="border-2 p-4 rounded-lg">
                    <div className="    ">
                      <h2 className="text-lg   ">
                        Assign Business Unit and Role
                      </h2>
                    </div>
                    {!isView && (
                      <div className="text-right ">
                        <button
                          type="button"
                          onClick={handleRowAdd}
                          style={{ backgroundColor: dynamicColor }}
                          className="px-4 py-2 text-white rounded hover:opacity-90 focus:outline-none transform transition-transform hover:scale-105 shadow-md"
                        >
                          Add Row
                        </button>
                      </div>
                    )}

                    {/* <div className="grid grid-cols-1 gap-4 pb-8 px-8">
                      {(data.businessUnitList || []).map(
                        (businessUnit, index) => (
                          <div key={index} className="">
                            <div className="flex  space-y-4">
                              <div className="grid grid-cols-3 items-center mr-4">
                                <label
                                  htmlFor="BusinessUnit"
                                  className="col-span-3 text-left"
                                >
                                  Select Business Unit
                                </label>
                                <Select
                                  className="col-span-3 "
                                  isDisabled={!(edit || data.id === 0)}
                                  classNames={{
                                    control: (state: any) =>
                                      state.isFocused
                                        ? "border-grey-300 text-black"
                                        : "text-black",
                                  }}
                                  value={{
                                    value: data.businessUnitList
                                      ? data.businessUnitList[index]?.id
                                      : null,
                                    label: data.businessUnitList
                                      ? data.businessUnitList[index]?.name
                                      : null,
                                  }}
                                  onChange={(selectedOptions: any) => {
                                    handleBuDropDown(selectedOptions, index);
                                    handleBuState(selectedOptions, index);
                                  }}
                                  placeholder="Select Business Unit"
                                  isSearchable={true}
                                  options={UserBuIdDropDownList}
                                  styles={{
                                    option: (base: any, state: any) => ({
                                      ...base,
                                      color: 'var(--neutral90)',
                                    }),
                                    control: (base: any) => ({
                                      ...base,
                                      backgroundColor: !(edit || data.id === 0) ? 'var(--disabled)' : base.backgroundColor,
                                      color:  !(edit || data.id === 0) ? 'white' : base.backgroundColor,
                                    }),
                                  }}
                                  theme={(theme) => ({
                                    ...theme,
                                    colors: {
                                      ...theme.colors,
                                      primary25: "var(--primary25)",
                                      primary50: "var(--primary50)",
                                      primary: "#16a34a",
                                      neutral0: "var(--neutral0)",
                                      neutral90: "var(--neutral90)",
                                      neutral80: "var(--neutral80)",
                                    },
                                  })}
                                />
                              </div>
                              <div className="grid grid-cols-3 items-center mr-4">
                                <label
                                  htmlFor="ProcedureCode"
                                  className="col-span-3 text-left"
                                >
                                  Select Roles
                                </label>

                                <Select
                                  className="col-span-3"
                                  isDisabled={!(edit || data.id === 0)}
                                  classNames={{
                                    control: (state: any) =>
                                      state.isFocused
                                        ? "border-grey-300 text-black"
                                        : "text-black",
                                  }}
                                  value={
                                    data.businessUnitList
                                      ? data.businessUnitList[
                                          index
                                        ].RoleList!.map((x) => ({
                                          value: x.id.toString(),
                                          label: x.name,
                                        }))
                                      : null
                                  }
                                  onChange={(selectedRoleOptions: any) => {
                                    if (
                                      selectedRoleOptions &&
                                      selectedRoleOptions.length > 0
                                    ) {
                                      const selectedRoles =
                                        selectedRoleOptions.map(
                                          (option: any) => ({
                                            id: parseInt(
                                              option?.value as string
                                            ),
                                            name: option?.label as string,
                                          })
                                        );
                                      handleRoleeState(selectedRoles, index);
                                    }
                                  }}
                                  isMulti
                                  isSearchable={true}
                                  options={RoleDropDownList}
                                  styles={{
                                    option: (base: any, state: any) => ({
                                      ...base,
                                      color: 'var(--neutral90)',
                                    }),
                                    control: (base: any) => ({
                                      ...base,
                                      backgroundColor: !(edit || data.id === 0) ? 'var(--disabled)' : base.backgroundColor,
                                      color:  !(edit || data.id === 0) ? 'white' : base.backgroundColor,
                                    }),
                                  }}
                                  theme={(theme) => ({
                                    ...theme,
                                    colors: {
                                      ...theme.colors,
                                      primary25: "var(--primary25)",
                                      primary50: "var(--primary50)",
                                      primary: "#16a34a",
                                      neutral0: "var(--neutral0)",
                                      neutral5: "var(--neutral5)",
                                      neutral10: "var(--neutral10)",
                                      neutral90: "var(--neutral90)",
                                      neutral80: "var(--neutral80)",
                                    },
                                  })}
                                />
                              </div>
                              <div className="col-span-3 flex items-end">
                                <button
                                  type="button"
                                  onClick={() => handleDeletebuRole(index)}
                                  className="p-2  bg-red-600 text-white rounded hover:bg-red-800 focus:outline-none"
                                >
                                  Delete
                                </button>
                              </div>
                              <div className="col-span-3 flex items-center space-x-4">
                                <label className="inline-flex items-center">
                                  <input
                                    type="checkbox"
                                    onChange={(e) => handleIsdefault(e, index)}
                                    checked={(data.businessUnitList as BusinessUnit[])[index]?.isDefault === 1}
                                    className="form-checkbox text-blue-500 h-4 w-4"
                                  />
                                  <span className="ml-2">Set Default</span>
                                </label>
                              </div>
                            </div>
                          </div>
                        )
                      )}  
                    </div> */}
                    <table className="grid grid-cols-1 gap-4 pb-8 px-8">
                      {(data.businessUnitList || []).map(
                        (businessUnit, index) => (
                          <tr key={index}>
                            <td className="pr-4">
                              <label
                                htmlFor="BusinessUnit"
                                className="text-left"
                              >
                                Select Business Unit
                              </label>
                              <Select
                                className=""
                                isDisabled={!(edit || data.id === 0)}
                                value={{
                                  value: data.businessUnitList![index]!.id!.toString()! ,
                                  label:
                                     data.businessUnitList![index]!.name!
                                }}
                                onChange={(selectedOptions) => {
                                  if (selectedOptions !== null) {
                                    handleBuDropDown(selectedOptions, index);
                                    handleBuState(selectedOptions, index);
                                  }
                                }}
                                
                                placeholder="Select Business Unit"
                                isSearchable={true}
                                options={UserBuIdDropDownList}
                                styles={{
                                  option: (base, state) => ({
                                    ...base,
                                    color: "var(--neutral90)",
                                  }),
                                  control: (base) => ({
                                    ...base,
                                    width: "200px", // Set the desired width
                                    backgroundColor: !(edit || data.id === 0)
                                      ? "#121212"
                                      : base.backgroundColor,
                                    color: !(edit || data.id === 0)
                                      ? "white"
                                      : base.backgroundColor,
                                  }),
                                  menu: (base) => ({
                                    ...base,
                                    maxHeight: "200px", // Set the desired height
                                    overflowY: "auto",
                                  }),
                                }}
                                theme={(theme) => ({
                                  ...theme,
                                  colors: {
                                    ...theme.colors,
                                    primary25: "var(--primary25)",
                                    primary50: "var(--primary50)",
                                    primary: 'var(--primaryDD)',
                                      neutral0: 'var(--neutral0)',
                                      neutral90: 'var(--neutral90)',
                                      neutral80: 'var(--neutral80)',
                                      neutral20: 'hsl(var(--border))',
                                      neutral30: 'hsl(var(--border))',
                                  },
                                })}
                              />
                            </td>
                            <td className="pr-4">
                              <label
                                htmlFor="ProcedureCode"
                                className="text-left"
                              >
                                Select Roles
                              </label>
                              <Select
                                className=""
                                isDisabled={!(edit || data.id === 0)}
                                value={
                                  data.businessUnitList
                                    ? data.businessUnitList[
                                        index
                                      ].RoleList!.map((x) => ({
                                        value: x.id.toString(),
                                        label: x.name,
                                      }))
                                    : null
                                }
                                onChange={(selectedRoleOptions) => {
                                  if (
                                    selectedRoleOptions &&
                                    selectedRoleOptions.length > 0
                                  ) {
                                    const selectedRoles =
                                      selectedRoleOptions.map((option) => ({
                                        id: parseInt(option?.value as string),
                                        name: option?.label as string,
                                      }));
                                    handleRoleeState(selectedRoles, index);
                                  }
                                }}
                                isMulti
                                isSearchable={true}
                                options={RoleDropDownList}
                                styles={{
                                  option: (base, state) => ({
                                    ...base,
                                    color: "var(--neutral90)",
                                  }),
                                  control: (base) => ({
                                    ...base,
                                    width: "200px", // Set the desired width
                                    backgroundColor: !(edit || data.id === 0)
                                      ? "#121212"
                                      : base.backgroundColor,
                                    color: !(edit || data.id === 0)
                                      ? "white"
                                      : base.backgroundColor,
                                  }),
                                  menu: (base) => ({
                                    ...base,
                                    maxHeight: "200px", // Set the desired height
                                    overflowY: "auto",
                                  }),
                                }}
                                theme={(theme) => ({
                                  ...theme,
                                  colors: {
                                    ...theme.colors,
                                    primary25: "var(--primary25)",
                                    primary50: "var(--primary50)",
                                    primary: 'var(--primaryDD)',
                                      neutral0: 'var(--neutral0)',
                                      neutral10: 'var(--neutral10)',
                                      neutral90: 'var(--neutral90)',
                                      neutral80: 'var(--neutral80)',
                                      neutral20: 'hsl(var(--border))',
                                      neutral30: 'hsl(var(--border))',
                                  },
                                })}
                              />
                            </td>
                            <td className="pr-4">
                              <button
                                type="button"
                                onClick={() => handleDeletebuRole(index)}
                                className="p-2 bg-red-600 text-white rounded hover:bg-red-800 focus:outline-none mt-6"
                              >
                                Delete
                              </button>
                            </td>
                            <td className="mt-8">
                              <label className="inline-flex items-center mt-6">
                                <input
                                  type="checkbox"
                                  onChange={(e) => handleIsdefault(e, index)}
                                  checked={
                                    (data.businessUnitList as BusinessUnit[])[
                                      index
                                    ]?.isDefault === 1
                                  }
                                  className="form-checkbox text-blue-500 h-4 w-4"
                                />
                                <span className="ml-2">Set Default</span>
                              </label>
                            </td>
                          </tr>
                        )
                      )}
                    </table>
                  </div>

                  {!isView && (
                    <div className="text-center  pt-4">
                      <button
                        type="button"
                        onClick={handleSaveChanges}
                        className="px-4 py-2 bg-[var(--primaryDD)] text-white rounded hover:bg-buttonfocus focus:outline-none"
                      >
                        Save changes
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}
      </form>
    </div>
  );
};

export default AddForm;
