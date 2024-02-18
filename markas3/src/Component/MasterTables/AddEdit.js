import React, { SyntheticEvent, useEffect, useState } from "react";
import "react-datepicker/dist/react-datepicker.css";
import DatePicker from "react-datepicker";
import { AppDispatch, useAppSelector } from "@/redux/store";
import { useDispatch } from "react-redux";
import { fetchOrganizationList } from "@/redux/features/organizationSlice";
import Select from "react-select";
import ReactSelectDropdown from "@/Models/React-Select-Dropdown";
import ProcedureCodeOrganizationBUWise from "@/Models/ProcedureCodeOrganizationBUWise";
import { useRouter} from "next/navigation";
import { fetchCodes } from "@/redux/features/ProcedureCodeSlice";
import {getICDTypeList } from "@/redux/features/businessUnitSlice";
import { addProcedureCode, editProcedureCode, fetchData, getById } from "@/redux/features/ProcedureCodeOrganizationBUWiseSlice";
import { toast } from "react-toastify";
import { getTokenFromLocalStorage } from "@/utils/GetSetToken";
import { XMarkIcon } from "@heroicons/react/20/solid";
import { RoleMenuItem } from "@/Models/RoleMenuItem";
export const initialFormData: ProcedureCodeOrganizationBUWise = {
  id: 0,
  procedureCode: {
    id: 0,
    code:"",
    createdBy: "1",
    updatedBy: 1,
    isActive: true,
    createdDate: new Date(),
    updatedDate: new Date(),
  },
  organization: {
    id: 0,
    name: "string",
    ContactInfo: {
      AddressLine: "string",
      AddressLine1: "string",
      city: "string",
      state: "string",
      county: "string",
      zip: "string",
      phone: "string",
      fax: "string",
      createdBy: "string",
      createdDate: new Date(),
      updatedBy: 1,
      updatedDate: new Date(),
      isActive: true,
    },
    logoImagePath: "string",
    Address1: "string",
    Address2: "string",
    city: "string",
    zipcode: "string",
    createdBy: "string",
    createdDate: new Date(),
    updatedBy: 1,
    updatedDate: new Date(),
    isActive: true,
  },
  businessUnit: {
    id: 0,
    name: "string",
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
    },
    address1: "string",
    address2: "string",
    city: "string",
    zipCode: "string",
    createdBy: "1",
    createdDate: new Date(),
    updatedBy: 1,
    updatedDate: new Date(),
    isActive: true,
  },
  unitValue:0,
  price: 0,
  effectiveFromDate: new Date(),
  effectiveToDate: new Date(),
  createdBy: "1",
  updatedBy: 1,
  isActive: true,
  createdDate: new Date(),
  updatedDate: new Date(),
};
type AddFormProps = {
  visible: boolean;
  setVisible: React.Dispatch<React.SetStateAction<boolean>>;
  setData: React.Dispatch<React.SetStateAction<ProcedureCodeOrganizationBUWise>>,
  data: ProcedureCodeOrganizationBUWise,
  isView:boolean,
  setIsView: React.Dispatch<React.SetStateAction<boolean>>;
  permissions:RoleMenuItem[]
  // ID:number;
  setRefresh: React.Dispatch<React.SetStateAction<number>>
};
const AddEditForm = 
(
  {
    visible,
    setVisible,
    setData,
    data,
    isView,
    setIsView,
    permissions,
    setRefresh
    // ID
  }: AddFormProps
) => {
  const dispatch = useDispatch<AppDispatch>();
  // const token = localStorage.getItem("jsonwebtoken") ?? "";
  // const [localStorageValue, setLocalStorageValue] = useState<string>(''); // Asserting that the initial value is a string
  // const [token,setToken]=useState("") 
  const organizationlist = useAppSelector(
    (store) => store.organizationSlice.organizationList
  );
  const ProcedureCodeList = useAppSelector(
    (store) => store.ProcedureCodeSlice.procedureCoedList
  );
  const BusinessUnitList=useAppSelector((store)=>store.businessUnitSlice.businessUnitList)
  const router = useRouter();
  const token=getTokenFromLocalStorage('jsonwebtoken');
  useEffect(() => {
    // const getToken=localStorage.getItem("jsonwebtoken")?? "";
    // setToken(getToken)
    const fetchDataAsync = async () => {
      try {
        dispatch(fetchCodes(token));
        dispatch(fetchOrganizationList(token));
        dispatch(getICDTypeList(token));
      } catch (error) {
        toast.error("An error occurred while fetching data");
      }
    };

    fetchDataAsync();
  }, []);
  
  const onClose = () => {
    setVisible(false);
      router.push("/Dashboard/DataAdmin/ProcedureCodeOrganizationBUWise");
      setData(initialFormData);
      setIsView(false);

  };
  
  const addeditPCOB = async (e: SyntheticEvent) => {
    e.preventDefault();
    if (data.id == 0) {
      if (data.procedureCode.id != 0 && data.effectiveFromDate && data.effectiveToDate && data.price && data.unitValue && data.organization.id != 0 && data.businessUnit.id != 0) {
        let model: ProcedureCodeOrganizationBUWise = {
          id: data.id,
          procedureCode: {
            id: data.procedureCode.id,
            code: data.procedureCode.code,
            createdBy: "1",
            createdDate: new Date(),
            isActive: true,
          },
          organization: {
            id: data.organization?.id,
            name: data.organization?.name,
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
          businessUnit:{ 
            id:data.businessUnit?.id,
            name:data.businessUnit?.name,
            organization:{
                id:0,
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
            },
            address1:"string",
            address2:"string",
            city:"string",
            zipCode:"string",
            createdBy: "1",
            createdDate: new Date(),
            updatedBy: 1,
            updatedDate: new Date(),
            isActive: true
          },
          unitValue: data.unitValue,
          price: data.price,
          effectiveFromDate: data.effectiveFromDate,
          effectiveToDate: data.effectiveToDate,
          createdBy: "1",
          createdDate: new Date(),
          updatedBy: 1,
          updatedDate: new Date(),
          isActive: true,
        };
        dispatch(addProcedureCode(token, model));
        setData(initialFormData);
        setVisible(false);
        setRefresh(prevCount =>prevCount+1)
      } else {
        toast.error("Please Fill all required fields");
      }
    } else {
      if (data.procedureCode.id != 0 && data.effectiveFromDate && data.effectiveToDate && data.price && data.unitValue && data.organization.id != 0 && data.businessUnit.id != 0) {
        let model: ProcedureCodeOrganizationBUWise = {
          id: data.id,
          procedureCode: {
            id: data.procedureCode?.id,
            code: data.procedureCode?.code as string,
            createdBy: "1",
            createdDate: new Date(),
            isActive: true,
          },
          organization: {
            id: data.organization?.id,
            name: data.organization?.name,
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
          businessUnit:{ 
              id:data.businessUnit?.id,
              name:data.businessUnit?.name,
              organization:{
                  id:0,
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
              },
              address1:"string",
              address2:"string",
              city:"string",
              zipCode:"string",
              createdBy: "1",
              createdDate: new Date(),
              updatedBy: 1,
              updatedDate: new Date(),
              isActive: true,
            },
          unitValue: data.unitValue,
          price: data.price,
          effectiveFromDate: data.effectiveFromDate,
          effectiveToDate: data.effectiveToDate,
          createdBy: "1",
          createdDate: new Date(),
          updatedBy: 1,
          updatedDate: new Date(),
          isActive: true,
        };
        dispatch(editProcedureCode(token, model));
        router.push("/Dashboard/DataAdmin/ProcedureCodeOrganizationBUWise");
        setData(initialFormData);
        setVisible(false);
        setRefresh(prevCount=>prevCount+1);
      }
      else {
        toast.error("Please Fill all required fields");
      }
    }
  };
  let selectedPcode: ReactSelectDropdown = {
    value: data.procedureCode.id!.toString() as string,
    label: data.procedureCode.code,
  };
  if (ProcedureCodeList.length > 0 && data.id == 0) {
    selectedPcode.value = "0";
    selectedPcode.label = "Select Procedure Code";
  }
  let PCodeDropDownList: ReactSelectDropdown[] = [];
  ProcedureCodeList.map((x) => {
    PCodeDropDownList.push({ value: x.id!.toString(), label: x.code! });
  });
  let selectedOrgList: ReactSelectDropdown = {
    value: data.organization.id!.toString() as string,
    label: data.organization.name!,
  };
  if (organizationlist.length > 0 && data.id == 0) {
    selectedOrgList.value = "0";
    selectedOrgList.label = "Select Organization";
  }

  let OrgDropDownList: ReactSelectDropdown[] = [];
  organizationlist.map((x) => {
    OrgDropDownList.push({ value: x.id!.toString(), label: x.name! });
  });

  let selectedBunitList: ReactSelectDropdown = {
    value: data.businessUnit.id!.toString() as string,
    label: data. businessUnit.name!
  };
  if (BusinessUnitList.length > 0 && data.id == 0) {
    selectedBunitList.value = "0";
    selectedBunitList.label = "Select Business Unit";
  }

  let BusinessUnitDropdownList: ReactSelectDropdown[] = [];
  BusinessUnitList.map((x) => {
    BusinessUnitDropdownList.push({ value: x.id!.toString(), label: x.name! });
  });
  // console.log("drop "+ JSON.stringify(BusinessUnitDropdownList, null, 2))

  const edit=permissions.some(
    (item)=>item.menuPermissionRuleMapping.permissionRule?.name?.toUpperCase() ==="UPDATE"
  )
  return (
    <div>
      <form>
        {visible && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-opacity-75 bg-gray-500 overflow-auto" aria-hidden="true" role="dialog" tabIndex={-1} aria-labelledby="partialViewModalLabel" data-backdrop="static">
          <div className="modal-dialog note-modal-form my-auto">
              <div className="modal-content animated fadeIn modal-dialog-center">
                    <div className="relative bg-[var(--popup)] p-4 rounded-lg shadow-lg max-w-6xl w-full">
                      <div className="flex border-b border-gray-700">
                        <div className="flex-1 text-center text-white">
                          <h1 className="font-bold text-3xl p-2 m-2 text-[var(--neutral90)]">Add Details</h1>
                        </div>
                        <div className="text-right">
                          <XMarkIcon color="var(--neutral90)" className="w-10 h-10 transition ease-in-out hover:-rotate-90" onClick={onClose}></XMarkIcon>
                        </div>
                      </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 px-8 py-8">
                <div className="grid grid-cols-2 items-center">
                  <label htmlFor="ProcedureCode" className="col-span-1 text-left">
                    Procedure Codes<span className="text-red-600 text-2xl">*</span>
                  </label>
                  <Select
                    className="col-span-3"
                    classNames={{
                      control: (state: { isFocused: any }) =>
                        state.isFocused
                          ? "border-grey-300 text-black"
                          : "text-black",
                    }}
                    defaultValue={selectedPcode}
                    onChange={(e) =>
                      setData({
                        ...data,
                        procedureCode: {
                          id: parseInt(e?.value as string),
                          code: e?.label as string,
                        },
                      })
                    }
                    isSearchable={true}
                    options={PCodeDropDownList}
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
                            primary: 'var(--primaryDD)',
                              neutral0: 'var(--neutral0)',
                              neutral90: 'var(--neutral90)',
                              neutral80: 'var(--neutral80)',
                              neutral20: 'hsl(var(--border))',
                              neutral30: 'hsl(var(--border))',
                          },
                        })}
                    isDisabled={!(edit || data.id === 0)}
                  />
                </div>
                <div className="grid grid-cols-2 items-center">
                  <label htmlFor="Organization" className="col-span-1 text-left">
                    Organizations<span className="text-red-600 text-2xl">*</span>
                  </label>
                  <Select
                    className="col-span-3"
                    classNames={{
                      control: (state) =>
                        state.isFocused
                          ? "border-grey-300 text-black"
                          : "text-black",
                    }}
                    defaultValue={selectedOrgList}
                    onChange={(e) =>
                      setData({
                        ...data,
                        organization: {
                          id: parseInt(e?.value as string),
                          name: e?.label as string,
                        },
                      })
                    }
                    isSearchable={true}
                    options={OrgDropDownList}
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
                            primary: 'var(--primaryDD)',
                              neutral0: 'var(--neutral0)',
                              neutral90: 'var(--neutral90)',
                              neutral80: 'var(--neutral80)',
                              neutral20: 'hsl(var(--border))',
                              neutral30: 'hsl(var(--border))',
                          },
                        })}
                    isDisabled={!(edit || data.id === 0)}
                  />
                </div>
                <div className="grid grid-cols-2 items-center">
                  <label htmlFor="BusinessUnit" className="col-span-3 text-left">
                    Business Unit<span className="text-red-600 text-2xl">*</span>
                  </label>
                  <Select
                    className="col-span-3"
                    classNames={{
                      control: (state) =>
                        state.isFocused
                          ? "border-grey-300 text-black"
                          : "text-black",
                    }}
                    defaultValue={selectedBunitList}
                    onChange={(e) =>
                      setData({
                        ...data,
                        businessUnit: {
                          id: parseInt(e?.value as string),
                          name: e?.label as string,
                        },
                      })
                    }
                    isSearchable={true}
                    options={BusinessUnitDropdownList}
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
                            primary: 'var(--primaryDD)',
                              neutral0: 'var(--neutral0)',
                              neutral90: 'var(--neutral90)',
                              neutral80: 'var(--neutral80)',
                              neutral20: 'hsl(var(--border))',
                              neutral30: 'hsl(var(--border))',
                          },
                        })}
                    isDisabled={!(edit || data.id === 0)}
                  />
                </div>
                <div className="grid grid-cols-2 items-center">
                  <label
                    htmlFor="UnitValue"
                    className="col-span-1 text-left"
                  >
                    Unit value<span className="text-red-600 text-2xl">*</span>
                  </label>
                  <input
                    type="number"
                    id="Unitvalue"
                    value={data.unitValue}
                    onChange={(e) =>
                      setData({
                        ...data,
                        unitValue: parseInt(e.target.value),
                      })
                    }
                    disabled={!(edit || data.id === 0)}
                    className="col-span-3 px-2 py-1 border rounded focus:outline-none focus:border-2 focus:border-borderfocus"
                  />
                </div>
                <div className="grid grid-cols-2 items-center">
                  <label
                    htmlFor="Price"
                    className="col-span-1 text-left"
                  >
                    Price<span className="text-red-600 text-2xl">*</span>
                  </label>
                  <input
                    type="number"
                    min={0}
                    id="Price"
                    value={data.price}
                    onChange={(e) =>
                      setData({
                        ...data,
                        price: parseInt(e.target.value),
                      })
                    }
                    disabled={!(edit || data.id === 0)}
                    className="col-span-3 px-2 py-1 border rounded focus:outline-none focus:border-2 focus:border-borderfocus"
                  />
                </div>
                <div className="grid grid-cols-2 items-center">
                  <label
                    htmlFor="effectiveFromDate"
                    className="col-span-1 text-left"
                  >
                    Effective From Date<span className="text-red-600 text-2xl">*</span>
                  </label>
                  <div className="col-span-3">
                  <DatePicker
                    id="effectiveFromDate"
                    value={data.effectiveFromDate ?new Date(data.effectiveFromDate!.toLocaleString())!.toLocaleDateString() : ''}
                    onChange={(e) =>
                      setData({ ...data, effectiveFromDate:e|| new Date() })
                    }
                    disabled={!(edit || data.id === 0)}
                    className="col-span-3 px-2 py-1 border rounded focus:outline-none focus:border-2 focus:border-borderfocus"
                  />
                  </div>
                </div>
                <div className="grid grid-cols-2 items-center">
                  <label
                    htmlFor="effectiveToDate"
                    className="col-span-1 text-left"
                  >
                    Effective To Date<span className="text-red-600 text-2xl">*</span>
                  </label>
                  <div className="col-span-3">
                  <DatePicker
                    id="effectiveToDate"
                    value={data.effectiveToDate ?new Date(data.effectiveToDate!.toLocaleString())!.toLocaleDateString() : ''}
                    onChange={(e) =>
                      setData({ ...data, effectiveToDate:e|| new Date() })
                    }
                    disabled={!(edit || data.id === 0)}
                    className="col-span-3 px-2 py-1 border rounded focus:outline-none focus:border-2 focus:border-borderfocus"
                  />
                  </div>
                </div>
              </div>
              {
              (!isView &&(edit || data.id ==0 ) )&&(
              <div className="text-center border-t border-gray-700 pt-4">
                <button
                  type="button"
                  onClick={addeditPCOB}
                  className="px-4 py-2 bg-[var(--primaryDD)] text-white rounded hover:bg-buttonfocus focus:outline-none"
                >
                  Save changes
                </button>
              </div>
                )
              }  
            </div>
          </div>
        </div>
      </div>
        )}
      </form>
    </div>
  );
};
export default AddEditForm;
