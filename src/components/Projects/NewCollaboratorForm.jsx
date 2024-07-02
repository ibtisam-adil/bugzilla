import { Dialog, Transition } from '@headlessui/react';
import { useFormik } from 'formik';
import PropTypes from 'prop-types';
import { Fragment, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { assignUserToProject } from '../../redux/projectTickets/ProjectTicketSlice';
import { fetchDevelopers, fetchQas } from '../../redux/auth/AuthSlice';

const NewCollaboratorForm = ({ isOpen, setIsOpen, projectId }) => {
  const dispatch = useDispatch();
  const [role, setRole] = useState('developer');

  const { developers, qas } = useSelector((state) => state.auth);

  const initialValues = {
    id: '',
  };

  const { values, handleChange, handleSubmit } = useFormik({
    initialValues,
    onSubmit: ({ id }) => {
      dispatch(assignUserToProject({ id, projectId }));
      setIsOpen(false);
    },
  });

  useEffect(() => {
    dispatch(fetchQas());
    dispatch(fetchDevelopers());
  }, [dispatch]);

  return (
    <Transition.Root show={isOpen} as={Fragment}>
      <Dialog
        as="div"
        className="fixed z-10 inset-0 overflow-y-auto"
        onClose={() => setIsOpen(false)}
      >
        <div className="flex items-center justify-center min-h-screen">
          <Transition.Child
            as={Fragment}
            enter="transition ease-out duration-300"
            enterFrom="opacity-0 scale-95"
            enterTo="opacity-100 scale-100"
            leave="transition ease-in duration-200"
            leaveFrom="opacity-100 scale-100"
            leaveTo="opacity-0 scale-95"
          >
            <Dialog.Panel>
              {/* <h1>hello</h1> */}
              <div className="relative bg-white max-w-[400px] mx-auto rounded-xl p-12 pb-0">
                <h1 className="pb-4 text-2xl text-center">Add Collaborator</h1>
                <form
                  className="w-full flex-col"
                  onSubmit={handleSubmit}
                >
                  <div className="flex flex-col my-4">
                    <div id="roleLabel" aria-label="Role:">
                      <div className="flex gap-8">
                        <div className="flex items-center">
                          <input
                            type="radio"
                            id="developer"
                            name="role"
                            value="developer"
                            checked={role === 'developer'}
                            onChange={() => setRole('developer')}
                            aria-labelledby="developerLabel"
                          />
                          <span id="developerLabel" className="ml-2">Developer</span>
                        </div>
                        <div className="flex items-center">
                          <input
                            type="radio"
                            id="qa"
                            name="role"
                            value="qa"
                            checked={role === 'qa'}
                            onChange={() => setRole('qa')}
                            aria-labelledby="qaLabel"
                          />
                          <span id="qaLabel" className="ml-2">QA</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  {role === 'developer' && (
                    <div className="flex flex-col my-4 w-[300px]">
                      <select
                        aria-label="Select Developer"
                        className="border-2 border-black p-2 rounded-xl"
                        value={values.id}
                        name="id"
                        onChange={handleChange}
                      >
                        <option value="">Select Developer</option>
                        {developers && developers.length > 0 ? developers.map((developer) => (
                          <option key={developer.id} value={developer.id}>{developer.name}</option>
                        )) : (
                          <option value="">No Developers Found</option>
                        )}
                      </select>
                    </div>
                  )}

                  {role === 'qa' && (
                    <div className="flex flex-col my-4 w-[300px]">
                      <select
                        aria-label="Select QA"
                        className="border-2 border-black p-2 rounded-xl"
                        value={values.id}
                        name="id"
                        onChange={handleChange}
                      >
                        <option value="">Select QA</option>
                        {qas && qas.length > 0 ? qas.map((qa) => (
                          <option key={qa.id} value={qa.id}>{qa.name}</option>
                        )) : (
                          <option value="">No QAs Found</option>
                        )}
                      </select>
                    </div>
                  )}
                  <div className="pt-8">
                    <input
                      className="w-full"
                      type="submit"
                      value="Add Collaborator"
                    />
                  </div>
                </form>
              </div>
            </Dialog.Panel>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition.Root>
  );
};

NewCollaboratorForm.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  setIsOpen: PropTypes.func.isRequired,
  projectId: PropTypes.number.isRequired,
};

export default NewCollaboratorForm;
