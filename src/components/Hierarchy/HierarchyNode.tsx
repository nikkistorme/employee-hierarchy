import type { User } from "../../types";
import UserPhoto from "../UserPhoto/UserPhoto";

interface HierarchyNodeProps {
  user: User;
  level: number;
  parentId: string;
  index: number;
}

const HierarchyNode = ({ user, level, parentId, index }: HierarchyNodeProps) => {
  const nodeId = `${parentId}-${index}`;
  const hasReports = user.reports && user.reports.length > 0;

  return (
    <div className="hierarchy__accordion" data-level={level}>
      <h2 className="hierarchy__accordion-trigger">
        {hasReports ? (
          <button
            type="button"
            className="hierarchy__accordion-button"
            aria-expanded="false"
            id={`accordion-button-${nodeId}`}
            aria-controls={`accordion-panel-${nodeId}`}
          >
            <span className="hierarchy__accordion-icon" aria-hidden="true">+</span>
            <UserPhoto
              photoUrl={user.photo}
              firstName={user.firstName}
              lastName={user.lastName}
            />
            {/* Email is hidden from screen readers for now to reduce verbal redundancy. Would require refactoring before production. */}
            <span>{user.firstName} {user.lastName} <span className="hierarchy__email" aria-hidden="true">{user.email}</span></span>
          </button>
        ) : (
          // If they don't have reports, this doesn't need to be an accordion trigger button
          <div className="hierarchy__accordion-no-reports" aria-label={`Employee: ${user.firstName} ${user.lastName}, ${user.email}, no direct reports`}>
            <span className="hierarchy__accordion-icon" aria-hidden="true">-</span>
            <UserPhoto
              photoUrl={user.photo}
              firstName={user.firstName}
              lastName={user.lastName}
            />
            <span>{user.firstName} {user.lastName} <span className="hierarchy__email" aria-hidden="true">{user.email}</span></span>
          </div>
        )}
      </h2>
      {hasReports && (
        <div
          className="hierarchy__accordion-panel"
          id={`accordion-panel-${nodeId}`}
          role="region"
          aria-hidden="true"
          hidden
        >
          {user.reports!.map((report, reportIndex) => (
            <HierarchyNode
              key={report.id || reportIndex}
              user={report}
              level={level + 1}
              parentId={nodeId}
              index={reportIndex}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default HierarchyNode;