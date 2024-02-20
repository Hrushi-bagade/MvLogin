import React, { useMemo, useState } from "react";
import {
  Table,
  TableHeader,
  TableColumn,
  Input,
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
import { DiagnosisCode } from "@/Models/DiagnosisCode";
import APIService from "@/utils/APIService";
import APIResponse from "@/Models/APIResponse";
import Select from "react-select";
import { paginationValues } from "@/utils/globalUtils";
import User from "@/Models/User";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/redux/store";
import { deleteUser } from "@/redux/features/UserSlice";
import { GetUserId, getTokenFromLocalStorage } from "@/utils/GetSetToken";
import SwitchButton from "@/app/Components/Switch";
import { RoleMenuItem } from "@/Models/RoleMenuItem";

type tableProps = {
  setIsView: React.Dispatch<React.SetStateAction<boolean>>;
  setIsVisible: React.Dispatch<React.SetStateAction<boolean>>;
  setUser: React.Dispatch<React.SetStateAction<User>>;
  setIsEdit: React.Dispatch<React.SetStateAction<boolean>>;
  permissions: RoleMenuItem[];
};

const DesignationTable = ({
  setIsView,
  setIsVisible,
  setUser,
  setIsEdit,
  permissions,
}: tableProps) => {
  const [page, setPage] = useState<number>(1);

  const [rowsPerPage, setRowsPerPage] = useState(
    +paginationValues[0].label as number
  );
  const token = getTokenFromLocalStorage("jsonwebtoken");
  const [showDeleted, setShowDeleted] = useState<number>(0);
  const UserId = GetUserId("userId");
  const dispatch = useDispatch<AppDispatch>();

  const [searchString, setSearchString] = useState<string>("");

  const deleteFunction = async (id: string) => {
    dispatch(deleteUser(token, id, UserId));
  };

  const fetcher = (
    url: string,
    token: string,
    pageNo: number,
    perPage: number,
    searchString?: string,
    showDeleted?: number
  ) =>
    APIService.GETLISTPAGINATED(
      url,
      pageNo,
      perPage,
      token,
      searchString,
      showDeleted
    )
      .then((data) => data as APIResponse)
      .then((data) => data.data as User[])
      .catch((err) => console.log(err));

  //check the user have the delete and readonly permissions

  const deletepermissions = permissions.some(
    (item) =>
      item.menuPermissionRuleMapping.permissionRule?.name?.toUpperCase() ===
      "DELETE"
  );

  const readonly = permissions.some(
    (item) =>
      item.menuPermissionRuleMapping.permissionRule?.name?.toUpperCase() ===
      "READONLY"
  );

  const handlePageChange = (rowsPerPage: number) => {
    setPage(1);
    setRowsPerPage(rowsPerPage);
  };

  const { data, isLoading } = useSWR(
    [
      `User/GetAllPaginated`,
      token,
      page,
      rowsPerPage,
      searchString,
      showDeleted,
    ],
    ([url, token, page, rowsPerPage, searchString, showDeleted]) =>
      fetcher(url, token, page, rowsPerPage, searchString, showDeleted),
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
    <div className="grow mx-5">
      <div className="grid grid-cols-12">
        <Input
          type="text"
          placeholder="Search..."
          className="col-span-3"
          size="sm"
          onChange={(e) => {
            var timer = 0;
            clearTimeout(timer);
            timer = window.setTimeout(function () {
              setSearchString(e.target.value);
            }, 1000);
          }}
        />
        <div className="col-span-7"></div>
        <div className="col-span-2 flex justify-end items-end">
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
        </div>
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
          <TableColumn className="text-lg" key="firstName">
            First Name
          </TableColumn>
          <TableColumn className="text-lg" key="lastName">
            Last Name
          </TableColumn>
          <TableColumn className="text-lg" key="userName">
            User Name
          </TableColumn>
          <TableColumn className="text-lg" key="email">
            Email
          </TableColumn>
          <TableColumn className="text-lg" key="BusinessUnitName">
            Business Unit Name
          </TableColumn>

          <TableColumn className="text-lg" key="action">
            Is Inactive
          </TableColumn>
        </TableHeader>
        <TableBody
          items={data ?? []}
          loadingContent={<Spinner />}
          loadingState={loadingState}
          emptyContent={"No rows to display."}
        >
          {(item: User) => (
            <TableRow
              key={item.id}
              onDoubleClick={() => {
                if (readonly === true) {
                  setUser(item);
                  setIsVisible(true);
                  setIsEdit(true);
                }
              }}
              className="cursor-pointer"
            >
              <TableCell>{item.id}</TableCell>
              <TableCell>{item.firstName}</TableCell>
              <TableCell>{item.lastName}</TableCell>
              <TableCell>{item.userName}</TableCell>
              <TableCell>{item.email}</TableCell>
              <TableCell>
                {item
                  .businessUnitList!.map((businessUnit) => businessUnit.name)
                  .join(",")}
              </TableCell>

              {/* <TableCell>{item.createdDate.toDateString()}</TableCell> */}
              {/* <TableCell>{item.updatedBy}</TableCell> */}
              {/* <TableCell>{item.updatedDate.toDateString()}</TableCell> */}
              <TableCell>
                {" "}
                {/*Actions cell*/}
                <SwitchButton
                  isSelected={!item.isActive}
                  id={item.id.toString()}
                  deleteFunction={deleteFunction}
                  deletePermission={deletepermissions}
                />
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
            option: (base: any) => ({
              ...base,
              color: 'var(--neutral90)'
            }),
          }}
          theme={(theme) => ({
            ...theme,
            colors: {
              ...theme.colors,
              primary25: 'var(--primary25)',
              primary50: 'var(--primary50)',
              primary: '#16a34a',
              neutral0: 'var(--neutral0)',
              neutral90: 'var(--neutral90)',
              neutral80: 'var(--neutral80)',
            },
          })}
        />
      </div>
    </div>
  ) : (
    ""
  );
};

export default DesignationTable;
