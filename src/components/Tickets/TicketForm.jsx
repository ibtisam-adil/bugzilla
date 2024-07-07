import { Dialog } from '@headlessui/react';
import { AnimatePresence, motion } from 'framer-motion';
import PropTypes from 'prop-types';
import { useFormik } from 'formik';
import { useDispatch } from 'react-redux';
import {
  TextField, Select, MenuItem, FormControl, InputLabel, Button,
} from '@mui/material';
import { createTicket, fetchTickets, updateTicket } from '../../redux/Tickets/TicketSlice';
import { fetchprojectTickets } from '../../redux/projectTickets/ProjectTicketSlice';

const TicketForm = ({
  isOpen, setIsOpen, formType, creatorId, projectId, ticket,
}) => {
  const dispatch = useDispatch();

  const {
    values, handleChange, handleSubmit, setFieldValue,
  } = useFormik({
    initialValues: {
      deadline: ticket ? ticket.deadline : '',
      bug_type: ticket ? ticket.bug_type : '',
      title: ticket ? ticket.title : '',
      description: ticket ? ticket.description : '',
      screenshot: null,
    },
    onSubmit: (values, actions) => {
      const ticketData = {
        bug:
        {
          ...values,
          project_id: projectId,
          creator_id: creatorId,
        },
      };
      if (formType === 'edit') {
        dispatch(updateTicket({ ticket: ticketData, id: ticket.id }))
          .then(() => dispatch(fetchTickets()));
      } else {
        dispatch(createTicket(ticketData)).then(() => dispatch(fetchprojectTickets(projectId)));
      }
      setIsOpen(false);
      actions.resetForm();
    },

  });

  const handleImageChange = (e) => {
    setFieldValue('screenshot', e.currentTarget.files[0]);
  };

  const getButtonLabel = () => {
    if (formType === 'ticket') {
      return 'Create Ticket';
    } if (formType === 'edit') {
      return 'Edit Project';
    }
    return 'Create New Project';
  };

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
                  <div className="text-2xl">Create Ticket</div>
                </div>

                <form className="w-full flex-col" method="post" onSubmit={handleSubmit}>
                  <div className="flex flex-col my-4">
                    <TextField
                      label="Title"
                      variant="outlined"
                      value={values.title}
                      type="text"
                      name="title"
                      placeholder="Enter Title"
                      onChange={handleChange}
                      fullWidth
                      required
                    />
                  </div>
                  <div className="flex flex-col my-4">
                    <FormControl variant="outlined" fullWidth>
                      <InputLabel>Type</InputLabel>
                      <Select
                        label="Type"
                        value={values.bug_type}
                        name="bug_type"
                        onChange={handleChange}
                        required
                      >
                        <MenuItem value=""><em>Select Type</em></MenuItem>
                        <MenuItem value="bug">Bug</MenuItem>
                        <MenuItem value="feature">Feature</MenuItem>
                      </Select>
                    </FormControl>
                  </div>
                  <div className="flex flex-col my-4">
                    <TextField
                      label="Description"
                      variant="outlined"
                      value={values.description}
                      name="description"
                      placeholder="Description"
                      onChange={handleChange}
                      multiline
                      rows={4}
                      fullWidth
                      required
                    />
                  </div>
                  <div className="flex flex-col my-4">
                    <InputLabel>Screenshot</InputLabel>
                    <input
                      type="file"
                      accept=".png, .gif"
                      onChange={handleImageChange}
                    />
                  </div>
                  <div className="flex flex-col my-4">
                    <TextField
                      label="Deadline"
                      type="date"
                      value={values.deadline}
                      name="deadline"
                      InputLabelProps={{
                        shrink: true,
                      }}
                      inputProps={{
                        min: new Date().toISOString().split('T')[0],
                      }}
                      onChange={handleChange}
                      fullWidth
                      required
                    />
                  </div>
                  <div className="pt-8">
                    <Button
                      variant="contained"
                      color="primary"
                      type="submit"
                      fullWidth
                    >
                      {getButtonLabel()}
                    </Button>
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

TicketForm.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  setIsOpen: PropTypes.func.isRequired,
  title: PropTypes.string,
  formType: PropTypes.string,
  creatorId: PropTypes.number,
  projectId: PropTypes.number,
  ticket: PropTypes.shape({
    id: PropTypes.number,
    title: PropTypes.string,
    description: PropTypes.string,
    deadline: PropTypes.string,
    bug_type: PropTypes.string,
  }),
};

TicketForm.defaultProps = {
  title: '',
  formType: '',
  creatorId: null,
  projectId: null,
  ticket: {
    id: null,
    title: '',
    description: '',
    deadline: '',
    bug_type: '',
  },
};

export default TicketForm;
