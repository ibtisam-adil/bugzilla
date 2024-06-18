import React from 'react';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import { Dialog, DialogPanel } from '@headlessui/react';
import { AnimatePresence, motion } from 'framer-motion';
import manager from '../../../public/Assets/manager.jpeg';
import dev from '../../../public/Assets/dev.jpeg';
import qa from '../../../public/Assets/qa.jpeg';
import { login } from '../../redux/auth/AuthSlice';

const DemoUsers = ({ isOpen, setIsOpen }) => {
  const dispatch = useDispatch();
  return (
    <>
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
              <DialogPanel
                as={motion.div}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="max-w-[400px] bg-white p-4 rounded-xl"
              >
                <i
                  className="bx bx-x text-4xl flex justify-end"
                  onClick={() => setIsOpen(false)}
                  onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ' ? setIsOpen(false) : null)}
                  role="button"
                  tabIndex="0"
                  aria-label="Close"
                />

                <div className="flex justify-center items-center font-bold mb-8 mt-4 gap-6">
                  <i className="bx bxs-bug text-4xl" />
                  <div className="text-2xl">Demo-User Login</div>
                </div>
                <div className="flex justify-center gap-14 mb-12">
                  <div
                    onClick={() => dispatch(login({ email: 'manager@gmail.com', password: '123456' }))}
                    onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ' ? dispatch(login({ email: 'john@gmail.com', password: '123456' })) : null)}
                    role="button"
                    tabIndex="0"
                    className="flex flex-col items-center w-[15%] hover:scale-90 transition-transform duration-300 gap-4"
                  >
                    <img
                      src={manager}
                      alt="admin"
                      className="rounded-full"
                    />
                    <p className="text-xl">Manager</p>
                  </div>
                  <div
                    onClick={() => dispatch(login({ email: 'developer@gmail.com', password: '123456' }))}
                    onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ' ? dispatch(login({ email: 'developer@gmail.com', password: '123456' })) : null)}
                    role="button"
                    tabIndex="0"
                    className="flex flex-col items-center w-[15%] hover:scale-90 transition-transform duration-300 gap-4"
                  >
                    <img src={dev} alt="dev" className="rounded-full" />
                    <p className="text-xl">Developer</p>
                  </div>
                  <div
                    onClick={() => dispatch(login({ email: 'qa@gmail.com', password: '123456' }))}
                    onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ' ? dispatch(login({ email: 'qa@gmail.com', password: '123456' })) : null)}
                    role="button"
                    tabIndex="0"
                    className="flex flex-col items-center w-[15%] hover:scale-90 transition-transform duration-300 gap-4"
                  >
                    <img src={qa} alt="Qa" className="rounded-full" />
                    <p className="text-xl">QA</p>
                  </div>
                </div>
              </DialogPanel>
            </div>
          </Dialog>
        )}
      </AnimatePresence>
    </>
  );
};
DemoUsers.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  setIsOpen: PropTypes.func.isRequired,
};

export default DemoUsers;
