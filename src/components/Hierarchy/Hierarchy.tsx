import { useEffect, useState } from "react";
import type { User } from "../../types";
import { fetchAllUsers } from "../../utils/api";
import { toggleHandler } from "../../utils/hierarchyUtils";
import HierarchyNode from "./HierarchyNode";
import LoadingSpinner from "../LoadingSpinner/LoadingSpinner";
import './Hierarchy.css';

const Hierarchy = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      const fetchedUsers = await fetchAllUsers();
      const sortedUsers = [] as User[];

      const userMap: { [key: number]: User } = {};
      fetchedUsers.forEach(user => userMap[user.id] = user);

      // Build hierarchy by assigning reports to their managers
      fetchedUsers.forEach((user: User) => {
        if (!user.managerId) {
          sortedUsers.push(user);
        } else {
          const manager = userMap[user.managerId];
          if (manager) {
            if (!manager.reports) manager.reports = [];
            manager.reports.push(user);
          }
        }
      });
      setUsers(sortedUsers);
      setIsLoading(false);
    };
    fetchData();
  }, []);

  return (
    <div className="hierarchy" onClick={toggleHandler}>
      {!isLoading && users.map((user, index) => (
        <HierarchyNode
          key={user.id}
          user={user}
          level={0}
          parentId="root"
          index={index}
        />
      ))}
      {isLoading && <LoadingSpinner />}
    </div>
  );
};

export default Hierarchy;
