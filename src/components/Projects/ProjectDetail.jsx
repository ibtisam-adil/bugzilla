import { useEffect, Fragment, useState } from 'react';
import { Menu, Transition } from '@headlessui/react';
import { ChevronDownIcon } from '@heroicons/react/20/solid';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import {
  deleteProject,
  fetchProjectById,
} from '../../redux/projects/ProjectSlice';
import ProjectForm from './ProjectForm';
import ProjectCollaborators from './ProjectCollaborators';
import { fetchprojectTickets } from '../../redux/projectTickets/ProjectTicketSlice';

function classNames(...classes) {
  return classes.filter(Boolean).join(' ');
}

const ProjectDetail = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();

  const [isOpen, setIsOpen] = useState(false);
  // const [isOpenTicket, setIsOpenTicket] = useState(false);
  const [formType, setFormType] = useState(null);

  const { id } = location.state || {
    id: parseInt(location.pathname.split('/').pop(), 10),
  };

  const { id: userId, user_type: userType } = useSelector((state) => state.auth.user) || {};

  const { projects } = useSelector((state) => state.projects);
  const project = projects && projects.find((project) => project.id === id);

  const isLogin = useSelector((state) => state.auth.isLogin);

  const handleDelete = () => {
    dispatch(deleteProject(project.id)).then(() => {
      navigate('/');
    });
  };

  const handleEditProject = () => {
    setFormType('edit');
    setIsOpen(true);
  };

  // const handleCreateTicket = () => {
  //   setFormType("ticket");
  //   setIsOpenTicket(true);
  // };

  useEffect(() => {
    if (!project && id && isLogin) {
      dispatch(fetchProjectById(id));
    }
  }, [dispatch, id, project, isLogin]);

  useEffect(() => {
    if (id && isLogin) {
      dispatch(fetchprojectTickets(id));
    }
  }, [dispatch, id, isLogin]);

  return (
    <div>
      {project ? (
        <>
          <div className="h-30 bg-white mx-auto mt-4 p-8 w-[calc(100%-30px)] rounded-lg shadow-md border-blue-500 border flex justify-between items-center">
            <h1>{project.name}</h1>
            <div>
              <Menu>
                <Menu.Button className="inline-flex w-full justify-center gap-x-1.5 rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50">
                  Actions
                  <ChevronDownIcon
                    className="-mr-1 h-5 w-5 text-gray-400"
                    aria-hidden="true"
                  />
                </Menu.Button>
                <Transition
                  as={Fragment}
                  enter="transition ease-out duration-100"
                  enterFrom="transform opacity-0 scale-95"
                  enterTo="transform opacity-100 scale-100"
                  leave="transition ease-in duration-75"
                  leaveFrom="transform opacity-100 scale-100"
                  leaveTo="transform opacity-0 scale-95"
                >
                  <Menu.Items className="absolute right-10 z-10 mt-2 w-56 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                    {userType === 'manager' && (
                      <>
                        <Menu.Item>
                          {({ active }) => (
                            <button
                              type="button"
                              onClick={handleEditProject}
                              className={classNames(
                                active ? 'bg-blue-500 text-white' : 'text-gray-700',
                                'block w-full text-left px-4 py-2 text-sm',
                              )}
                            >
                              Edit
                            </button>
                          )}
                        </Menu.Item>

                        <Menu.Item>
                          {({ active }) => (
                            <button
                              type="button"
                              onClick={handleDelete}
                              className={classNames(
                                active ? 'bg-blue-500 text-white' : 'text-gray-700',
                                'block w-full text-left px-4 py-2 text-sm',
                              )}
                            >
                              Delete
                            </button>
                          )}
                        </Menu.Item>
                      </>
                    )}
                    {/* {userType === 'qa' && (
                      <Menu.Item>
                        {({ active }) => (
                          <button
                            type="button"
                            onClick={handleCreateTicket}
                            className={classNames(
                              active ? 'bg-blue-500 text-white' : 'text-gray-700',
                              'block w-full text-left px-4 py-2 text-sm',
                            )}
                          >
                            Create Ticket
                          </button>
                        )}
                      </Menu.Item>
                    )} */}
                  </Menu.Items>
                </Transition>
              </Menu>
            </div>
          </div>
          <div className="grid sm:grid-cols-2">
            <ProjectCollaborators
              projectId={project.id}
              userType={userType}
            />
            {/* <ProjectTickets project_id={project.id} /> */}
          </div>

          <ProjectForm
            isOpen={isOpen}
            setIsOpen={() => setIsOpen(false)}
            title="Edit Project"
            project={project}
            formType={formType}
            user_id={userId}
          />
          {/* <TicketForm
            isOpen={isOpenTicket}
            setIsOpen={() => setIsOpenTicket(false)}
            project_id={project.id}
            creator_id={userId}
            formType="create"
          /> */}
        </>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default ProjectDetail;
