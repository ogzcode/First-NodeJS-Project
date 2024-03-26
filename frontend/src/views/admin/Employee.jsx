import { useState, useEffect } from "react"
import {
    createColumnHelper,
} from "@tanstack/react-table"

import { getAllUsers } from "../../services/api/admin/adminApi"
import { FaPencil, FaTrash } from "react-icons/fa6"
import { IconButton } from "../../components/IconButton"
import DataTable from "../../components/DataTable"
import ConfirmDialog from "../../components/ConfirmDialog"

import { deleteUserById } from "../../services/api/admin/adminApi"

const columnHelper = createColumnHelper()

export default function Employee() {
    const [users, setUsers] = useState([])
    const [deleteConfirm, setDeleteConfirm] = useState(false)
    const [selectedUser, setSelectedUser] = useState(null)
    useEffect(() => {
        getAllUsers().then(res => {
            setUsers(res.data.data.users)
        })
    }, [])

    const columns = [
        columnHelper.accessor("id", {
            cell: info => info.getValue().toString(),
            header: "ID",
            footer: "ID",
        }),
        columnHelper.accessor("username", {
            cell: info => info.getValue(),
            header: "Name",
            footer: "Name",
        }),
        columnHelper.accessor("email", {
            cell: info => info.getValue(),
            header: "Email",
            footer: "Email",
        }),
        columnHelper.accessor("role", {
            cell: info => info.getValue(),
            header: "Role",
            footer: "Role",
        }),
        columnHelper.display({
            id: "actions",
            cell: props => (
                <div className="flex gap-2">
                    <IconButton
                        icon={<FaPencil />}
                        onClick={() => {
                            // eslint-disable-next-line react/prop-types
                            setSelectedUser(props.row.original);

                        }}
                        severity="primary"
                        outline={true}
                    />
                    <IconButton
                        icon={<FaTrash />}
                        onClick={() => {
                            setDeleteConfirm(true)
                            // eslint-disable-next-line react/prop-types
                            setSelectedUser(props.row.original)
                        }}
                        severity="danger"
                        outline={true}
                    />
                </div>
            ),
            header: "Actions",
        }),
    ]

    const handleDeleteUser = () => {
        deleteUserById(selectedUser.id)
            .then(() => {
                setUsers(users.filter(user => user.id !== selectedUser.id))
                setDeleteConfirm(false)
            })
            .catch(err => {
                console.error(err)
                setDeleteConfirm(false)
            })
        
        setSelectedUser(null)
    }

    return (
        <div className="p-6">
            <div className="bg-white relative shadow-md sm:rounded-lg overflow-hidden p-8">
                <DataTable
                    data={users}
                    columns={columns}
                    headerChildren={
                        <div className="flex gap-2">
                            <button className="btn btn-primary">Add Employee</button>
                        </div>
                    }
                />
                <ConfirmDialog
                    open={deleteConfirm}
                    onClose={() => setDeleteConfirm(false)}
                    onConfirm={() => handleDeleteUser()}
                    title="Delete Employee"
                    message="Are you sure you want to delete this employee?"
                    severity="danger"
                />
            </div>
        </div>
    )
}