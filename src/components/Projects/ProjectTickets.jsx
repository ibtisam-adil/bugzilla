import { createSelector } from '@reduxjs/toolkit';
import { useMemo } from 'react';
import { useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';

const ProjectTickets = (projectId) => {
  const selectBugs = createSelector(
    (state) => state.projectTickets.projectTickets,
    (projectTickets) => projectTickets?.bugs || [],
  );

  const data = useSelector(selectBugs);
  const tickets = useMemo(() => data, [data]);

  return (
    <div className="bg-[#F7F8FB] m-8 border border-blue-500 sm:max-h-[600px] overflow-auto collaborator-container">
      <h3 className="text-3xl text-center p-4">Tickets</h3>
      <div className="collaborators">
        <table className="styled-table">
          <colgroup>
            <col style={{ width: '33%' }} />
            <col style={{ width: '33%' }} />
            <col style={{ width: '33%' }} />
          </colgroup>
          <thead>
            <tr>
              <th>title</th>
              <th>type</th>
              <th>status</th>
            </tr>
          </thead>
          <tbody>
            {tickets
              && tickets.map((ticket) => (
                <tr key={ticket.id}>
                  <td className="project-name">
                    <NavLink
                      className="border-b border-blue-500"
                      state={{ id: ticket.id, projectId }}
                      to={`/tickets/${ticket.id}`}
                    >
                      {ticket.title}
                    </NavLink>
                  </td>
                  <td>{ticket.bug_type}</td>
                  <td className={`${ticket.bug_type === 'open' ? 'text-green-500' : 'text-red-500'}`}>{ticket.status}</td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ProjectTickets;
