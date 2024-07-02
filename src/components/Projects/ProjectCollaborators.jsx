import { useDispatch, useSelector } from 'react-redux';
import { useState, useMemo } from 'react';
import PropTypes from 'prop-types';
import { removeUserFromProject } from '../../redux/projectTickets/ProjectTicketSlice';
import NewCollaboratorForm from './NewCollaboratorForm';

const ProjectCollaborators = ({ projectId, userType }) => {
  const [isOpen, setIsOpen] = useState(false);
  const dispatch = useDispatch();

  const data = useSelector(
    (state) => state.projectTickets.projectTickets?.collaborators || [],
  );
  // console.log(data);

  const collaborators = useMemo(() => data, [data]);
  // console.log(collaborators);

  return (
    <>
      <div className="bg-[#F7F8FB] m-8 border border-blue-500 sm:max-h-[600px] overflow-auto collaborator-container">
        <h3 className="text-3xl text-center p-4">Collaborators</h3>
        {userType === 'manager' && (
          <>
            <div className="text-end px-8 pb-4">
              <button
                type="button"
                onClick={() => setIsOpen(true)}
                className="bg-[red] text-white sm:w-32 w-24 text-[5px] md:text-[8px] sm:py-4  p-2 rounded-xl text-center"
              >
                Add Collaborator
              </button>
            </div>
            <div className="w-full h-[1px] bg-[#ddd]" />
          </>
        )}
        <div className="collaborators">
          <table className="styled-table" style={{ tableLayout: 'fixed' }}>
            <colgroup>
              <col style={{ width: '33%' }} />
              <col style={{ width: '33%' }} />
              <col style={{ width: '33%' }} />
            </colgroup>

            <thead>
              <tr>
                <th>Role</th>
                <th>Name</th>
                <th>Remove</th>
              </tr>
            </thead>
            <tbody>
              {/* {console.log(collaborators.user_type)}
              {console.log(collaborators.id)}
              {console.log(collaborators.name)} */}
              {collaborators.length > 0
              && collaborators.map(
                (collaborator) => collaborator.user_type !== 'manager' && (
                  <tr key={collaborator.id}>
                    <td className="project-name">{collaborator.name}</td>
                    <td style={{ width: '65%' }}>
                      {collaborator.user_type}
                    </td>
                    {collaborator.user_type === 'manager' && (
                      <td>
                        <button
                          type="button"
                          onClick={() => dispatch(
                            removeUserFromProject({
                              projectId,
                              id: collaborator.id,
                            }),
                          )}
                          className="text-red-500 border-b-2 border-red-500"
                        >
                          Remove
                        </button>
                      </td>
                    )}
                  </tr>
                ),
              )}
            </tbody>
          </table>
        </div>
      </div>
      <NewCollaboratorForm
        isOpen={isOpen}
        setIsOpen={() => setIsOpen(false)}
        projectId={projectId}
      />
    </>
  );
};

ProjectCollaborators.propTypes = {
  projectId: PropTypes.number.isRequired,
  userType: PropTypes.string.isRequired,
};

export default ProjectCollaborators;
