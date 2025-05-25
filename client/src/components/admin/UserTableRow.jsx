import React from "react";
import { TableCell, TableRow } from "../ui/table";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Switch } from "../ui/switch";

const UsersTableRow = ({ userDetails, handleBlockStatus }) => {
  return (
    <TableRow>
      <TableCell>{userDetails.name}</TableCell>
      <TableCell>{userDetails.email}</TableCell>
      <TableCell>
        <Avatar className={"w-11 h-11"}>
          {userDetails && userDetails?.avatar ? (
            <AvatarImage src={userDetails.avatar} className={"object-cover"} />
          ) : (
            <AvatarFallback className={"font-bold text-lg"}>
              {userDetails.name[0]}
            </AvatarFallback>
          )}
        </Avatar>
      </TableCell>
      <TableCell>
        {new Date(userDetails.createdAt).toLocaleDateString()}
      </TableCell>
      <TableCell>
        <Switch
          defaultChecked={userDetails.status}
          onCheckedChange={(value) => handleBlockStatus(userDetails._id, value)}
        />
      </TableCell>
    </TableRow>
  );
};

export default UsersTableRow;
