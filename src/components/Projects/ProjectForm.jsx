import { Dialog } from '@headlessui/react';
import { AnimatePresence, motion } from 'framer-motion';
import PropTypes from 'prop-types';
import { useFormik } from 'formik';
import { useDispatch } from 'react-redux';
import { createProjects, fetchProjects, updateProject } from '../../redux/projects/ProjectSlice';

const ProjectForm = ({
  isOpen, setIsOpen, project, formType, title,
}) => {
  const dispatch = useDispatch();

  const initialValues = {
    name: project ? project.name : '',
    description: project ? project.description : '',
    title: '',
  };

  const {
    values, handleBlur, handleChange, handleSubmit,
  } = useFormik({
    initialValues,
    onSubmit: async (values, action) => {
      if (formType === 'edit') {
        dispatch(updateProject({ project: values, id: project.id }));
      } else {
        dispatch(createProjects(values));
      }
      dispatch(fetchProjects());
      setIsOpen(false);
      action.resetForm();
    },
  });

  return (
    <div>
      <AnimatePresence>
        {isOpen && (
          <Dialog static open={isOpen} onClose={() => setIsOpen(false)} className="relative z-50">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/30"
            />
            <div className="fixed inset-0 flex w-screen items-center justify-center p-2">
              <Dialog.Panel
                as={motion.div}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="max-w-[320px] w-[25%] bg-white p-4 rounded-xl"
              >
                <button
                  type="button"
                  className="text-4xl flex justify-end cursor-pointer"
                  onClick={() => setIsOpen(false)}
                  aria-label="Close"
                >
                  &times;
                </button>

                <div className="flex justify-center items-center font-bold mb-8 mt-4 gap-6">
                  <div className="text-2xl">{title}</div>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      placeholder="Project Name"
                      value={values.name}
                      aria-label="Project Name"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      className="mt-1 block w-full pl-5 pr-5 py-4 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 text-lg"
                    />
                  </div>
                  <div>
                    <textarea
                      id="description"
                      name="description"
                      rows="4"
                      placeholder="Description"
                      value={values.description}
                      aria-label="Description"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      className="mt-1 block px-4 pt-2 pb-10 w-full bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 text-lg"
                    />
                  </div>
                  <div className="flex justify-end">
                    <button
                      type="submit"
                      className="px-4 py-2 bg-blue-500 text-white rounded-md shadow-sm hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                    >
                      {title}
                    </button>
                  </div>
                </form>
              </Dialog.Panel>
            </div>
          </Dialog>
        )}
      </AnimatePresence>
    </div>
  );
};

ProjectForm.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  setIsOpen: PropTypes.func.isRequired,
  project: PropTypes.shape({
    id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    name: PropTypes.string,
    description: PropTypes.string,
  }),
  formType: PropTypes.string,
  title: PropTypes.string.isRequired,
};

ProjectForm.defaultProps = {
  project: {},
  formType: 'create',
};

export default ProjectForm;
