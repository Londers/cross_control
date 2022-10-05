import {Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow} from "@mui/material";
import React from "react";
import {EditInfoMsg} from "../../common";

function EditInfo(props: { editInfo: EditInfoMsg }) {

    const rows = props.editInfo.users

    return (
        <TableContainer component={Paper} style={{
            position: "absolute",
            top: "3.85rem",
            right: "9%",
            border: "thick",
            backgroundColor: "white",
            width: "fit-content",
            zIndex: 2,
        }}>
            <Table aria-label="simple table">
                <TableHead>
                    <TableRow>
                        <TableCell>Пользователь</TableCell>
                        <TableCell>Статус</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {rows.map((row) => (
                        <TableRow
                            key={row.user}
                            sx={{'&:last-child td, &:last-child th': {border: 0}}}
                        >
                            <TableCell>{row.user}</TableCell>
                            <TableCell>{row.edit ? "Редактирует" : "Просматривает"}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    )
}

export default EditInfo