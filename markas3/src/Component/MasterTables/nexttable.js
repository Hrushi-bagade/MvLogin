import React, { useEffect, useMemo, useState } from "react";
import {
  Table,
  TableHeader,
  Input,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Pagination,
  Spinner,
  getKeyValue,
  Dropdown,
  Button,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
  cn,
} from "@nextui-org/react";
import useSWR from "swr";
import APIService from "@/utils/APIService";
import APIResponse from "@/Models/APIResponse";
import {
  EllipsisVerticalIcon,
  TrashIcon,
  EyeIcon,
  PencilIcon,
} from "@heroicons/react/20/solid";
import Select from "react-select";
import { paginationValues } from "@/utils/globalUtils";
import ProcedureCodeOrganizationBUWise from "@/Models/ProcedureCodeOrganizationBUWise";
import { useRouter } from "next/navigation";
import { DeletePopup } from "@/app/Components/DeletePopup";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/redux/store";
import { deleteProcedureCode } from "@/redux/features/ProcedureCodeOrganizationBUWiseSlice";
import { GetUserId, getTokenFromLocalStorage } from "@/utils/GetSetToken";
import SwitchButton from "@/app/Components/Switch";
import { RoleMenuItem } from "@/Models/RoleMenuItem";
const iconClasses =
  "text-xl text-default-500 pointer-events-none flex-shrink-0 w-5";

type tableProps = {
  setIsVisible: React.Dispatch<React.SetStateAction<boolean>>;
  setData: React.Dispatch<
    React.SetStateAction<ProcedureCodeOrganizationBUWise>
  >;
  permissions: RoleMenuItem[];
  setRefresh: React.Dispatch<React.SetStateAction<number>>
  refresh: number;
};

export default function ProcedureCodeOrganizationBUWiseTable({
  setIsVisible,
  setData,
  permissions,
  setRefresh,
  refresh
}: tableProps) {
  const [page, setPage] = useState<number>(1);
  const router = useRouter();
  const [rowsPerPage, setRowsPerPage] = useState(
    +paginationValues[0].label as number
  );
  const dispatch = useDispatch<AppDispatch>();
  const [deletePopup, setDeletePopup] = useState(false);

  const [deleteId, setDeleteId] = useState<string>("");
  const [searchString, setSearchString] = useState<string>("");
  const [showDeleted, setShowDeleted] = useState<number>(0);
  const userId = GetUserId("userId");

  //storing boolean value of readonly permission
  const readonly = permissions.some(
    (item) =>
      item.menuPermissionRuleMapping.permissionRule!.name?.toUpperCase() ===
      "READONLY"
  );

  //storing boolean value of Delete permission
  const deletePermission = permissions.some(
    (item) =>
      item.menuPermissionRuleMapping.permissionRule!.name?.toUpperCase() ===
      "DELETE"
  );

  //storing boolean value of Show Deleted permission
  const ShowDeletedPermission = permissions.some(
    (item) =>
      item.menuPermissionRuleMapping.permissionRule?.name?.toUpperCase() ===
      "SHOWDELETED"
  );

  const deleteFunction = async (id: string) => {
    dispatch(deleteProcedureCode(token, id, userId));
    setDeletePopup(false);
    setRefresh(prevCount=>prevCount+1)
  };

  // const [token,setToken]= useState("")
  // useEffect(() => {
  //   const getToken=localStorage.getItem("jsonwebtoken")?? "";
  //   setToken(getToken)
  // }, []);
  const token = getTokenFromLocalStorage("jsonwebtoken");
  const buId = parseInt(getTokenFromLocalStorage("BuId"));

  const fetcher = (
    url: string,
    token: string,
    buId:number,
    pageNo: number,
    perPage: number,
    searchString: string,
    showDeleted: number
  ) =>
    APIService.GETLISTPAGINATEDBYBUID(
      url,
      pageNo,
      perPage,
      buId,
      token,
      searchString,
      showDeleted
    )
      .then((data) => data as APIResponse)
      .then((data) => data.data as ProcedureCodeOrganizationBUWise[])
      .catch((err) => console.log(err));

  const handlePageChange = (rowsPerPage: number) => {
    setPage(1);
    setRowsPerPage(rowsPerPage);
  };

  const { data, isLoading } = useSWR(
    [
      `ProcedureCodeOrganizationBUWise/GetAllPaginated`,
      token,
      buId,
      page,
      rowsPerPage,
      searchString,
      showDeleted,
      refresh
    ],
    ([url, token,buId,page, rowsPerPage, searchString, showDeleted,refresh]) =>
      fetcher(url,token,buId,page, rowsPerPage, searchString, showDeleted),
    {
      keepPreviousData: true,
    }
  );

  const pages = useMemo(() => {
    var val =
      data && data![0]?.count ? Math.ceil(data![0].count / rowsPerPage) : 0;
    if (val == 0 && page > 1) {
      setPage(page - 1);
    }
    return val;
  }, [data, rowsPerPage]);

  const loadingState = isLoading || data?.length === 0 ? "loading" : "idle";

  return data ? (
    <div className="grow mx-5 mt-5">
      <div className="grid grid-cols-12">
        <Input
          type="text"
          placeholder="Search..."
          className="col-span-3"
          onChange={(e) => {
            var timer = 0;
            clearTimeout(timer);
            timer = window.setTimeout(function () {
              setSearchString(e.target.value);
            }, 1000);
          }}
        />
        <div className="col-span-6"></div>
      </div>
      <div className="justify-end flex">
        {
        ShowDeletedPermission &&  //Conditional rendering Show Inactive Checkbox  
        <label className="flex items-center">
          <input
            type="checkbox"
            onChange={(e) => {
              setShowDeleted(e.target.checked ? 1 : 0);
              setPage(1);
            }}
            className="mr-2"
          />
          <span>Show Inactive</span>
        </label>
        } 
      </div>
      <Table
        isStriped
        className="mt-2 w-full"
        aria-label="Example table with client async pagination"
        bottomContent={
          pages > 0 ? (
            <div className="flex w-full justify-center">
              <Pagination
                isCompact
                showControls
                showShadow
                color="primary"
                page={page}
                total={pages}
                onChange={(page: number) => setPage(page)}
              />
            </div>
          ) : null
        }
      >
        <TableHeader>
          <TableColumn className="text-lg" key="id">
            ID
          </TableColumn>
          <TableColumn className="text-lg" key="code">
            Procedure Code
          </TableColumn>
          <TableColumn className="text-lg" key="UnitValue">
            Unit Value
          </TableColumn>
          <TableColumn className="text-lg" key="Price">
            Price
          </TableColumn>
          <TableColumn className="text-lg" key="Organization">
            Organization
          </TableColumn>
          <TableColumn className="text-lg" key="BusinessUnit">
            Business Unit
          </TableColumn>
          <TableColumn className="text-lg" key="EffectiveFromDate">
            {" "}
            Effective from Date
          </TableColumn>
          <TableColumn className="text-lg" key="Effective To Date">
            {" "}
            Effective to Date
          </TableColumn>
          {/* <TableColumn key="createdDate">Created Date</TableColumn> */}
          <TableColumn className="text-lg" key="updatedBy">
            Updated By
          </TableColumn>
          {/* <TableColumn key="updatedDate">Updated Date</TableColumn> */}
          <TableColumn className="text-lg" key="actions">
            Actions
          </TableColumn>
        </TableHeader>
        <TableBody
          items={data ?? []}
          loadingContent={<Spinner />}
          loadingState={loadingState}
          emptyContent={"No rows to display."}
        >
          {(item: ProcedureCodeOrganizationBUWise) => (
            <TableRow
              key={item.id}
              className={`${readonly ? "cursor-pointer" : ""}`}
              onDoubleClick={() => {
                if (readonly === true) {
                  setData(item);
                  setIsVisible(true);
                }
              }}
            >
              <TableCell>{item.id}</TableCell>
              <TableCell>{item.procedureCode.code}</TableCell>
              <TableCell>{item.unitValue}</TableCell>
              <TableCell>{item.price}</TableCell>
              <TableCell>{item.organization.name}</TableCell>
              <TableCell>{item.businessUnit.name}</TableCell>
              <TableCell>
                {new Date(
                  item.effectiveFromDate!.toLocaleString()
                )!.toLocaleDateString()}
              </TableCell>
              <TableCell>
                {new Date(
                  item.effectiveToDate!.toLocaleString()
                )!.toLocaleDateString()}
              </TableCell>
              {/* <TableCell>{item.createdDate.toDateString()}</TableCell> */}
              <TableCell>{item.updatedBy}</TableCell>
              {/* <TableCell>{item.updatedDate.toDateString()}</TableCell> */}
              <TableCell>
                {" "}
                {/*Actions cell*/}
                {
                  <SwitchButton
                    isSelected={!item.isActive}
                    id={item.id.toString()}
                    deleteFunction={deleteFunction}
                    deletePermission={deletePermission} //Passing if DELETE PERMISSION is present for the user. True or False value
                  />
                }
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
      <div className="grid grid-cols-10 gap-4 my-5">
        <div className="col-start-1 col-end-7">
          Showing {data ? (page - 1) * rowsPerPage + 1 : 0} to{" "}
          {data ? (page - 1) * rowsPerPage + data.length : 0} of{" "}
          {data?.[0]?.count} entries
        </div>
        <div className="col-start-8 col-end-10 text-right align-middle self-center">
          Rows per page
        </div>
        <Select
          className="col-end-11 col-span-1"
          classNames={{
            control: (state: any) =>
              state.isFocused ? "border-grey-300 text-black" : "text-black",
          }}
          defaultValue={{
            value: rowsPerPage.toString(),
            label: rowsPerPage.toString(),
          }}
          onChange={(e: any) => handlePageChange(e.value)}
          isSearchable={true}
          options={paginationValues}
          styles={{
            option: (base: any, state: any) => ({
              ...base,
              color: 'var(--neutral90)'
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
      </div>
    </div>
  ) : (
    ""
  );
}
