import { Fragment, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Menu, Transition } from '@headlessui/react';
import { ChevronDownIcon } from '@heroicons/react/20/solid';
import { useLocation, useNavigate } from 'react-router-dom';
import TicketForm from './TicketForm';
import {
  assignTicket,
  deleteTicket,
  fetchTicketById,
  markTicketAsCompleted,
} from '../../redux/Tickets/TicketSlice';
import ScreenshotPopup from './ScreenshotPopup';

function classNames(...classes) {
  return classes.filter(Boolean).join(' ');
}

const Ticket = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();
  const { id } = location.state || {
    id: parseInt(location.pathname.split('/').pop(), 10),
  };

  const [isOpenTicket, setIsOpenTicket] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const { id: userId, user_type: userType } = useSelector((state) => state.auth.user) || {};
  const { isLogin } = useSelector((state) => state.auth) || {};

  const { tickets } = useSelector((state) => state.Ticket);
  const ticket = tickets && tickets.length > 0 && tickets.find((ticket) => ticket.id === id);

  const handleDeleteTicket = () => {
    dispatch(deleteTicket(ticket.id)).then(() => navigate('/tickets'));
  };

  useEffect(() => {
    if (!ticket && id && isLogin) {
      dispatch(fetchTicketById(id));
    }
  }, [dispatch, id, ticket, isLogin]);

  console.log(ticket.screenshot_url);

  return (
    <>
      <div className="h-30 bg-white mx-auto mt-4 p-8 w-[calc(100%-30px)] rounded-lg shadow-md border-blue-500 border flex justify-between items-center">
        <h1>{ticket.title}</h1>
        <div>
          <Menu>
            {(userType === 'developer' || userType === 'qa') && (
            <Menu.Button className="inline-flex w-full justify-center gap-x-1.5 rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50">
              Actions
              <ChevronDownIcon
                className="-mr-1 h-5 w-5 text-gray-400"
                aria-hidden="true"
              />
            </Menu.Button>
            )}
            <Transition
              as={Fragment}
              enter="transition ease-out duration-100"
              enterFrom="transform opacity-0 scale-95"
              enterTo="transform opacity-100 scale-100"
              leave="transition ease-in duration-75"
              leaveFrom="transform opacity-100 scale-100"
              leaveTo="transform opacity-0 scale-95"
            >
              <Menu.Items className="absolute right-16 z-10 mt-2 w-56 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                {userType === 'developer' && (
                  <>
                    {ticket.status && ticket.status === 'open' ? (
                      <Menu.Item>
                        {({ active }) => (
                          <button
                            type="button"
                            onClick={() => dispatch(assignTicket(ticket.id))}
                            className={classNames(
                              active
                                ? 'bg-blue-500 text-white'
                                : 'text-gray-700',
                              'block px-4 py-2 text-sm',
                            )}
                          >
                            Assign ticket
                          </button>
                        )}
                      </Menu.Item>
                    ) : (
                      <Menu.Item>
                        {({ active }) => (
                          <button
                            type="button"
                            onClick={() => dispatch(markTicketAsCompleted(ticket.id))}
                            className={classNames(
                              active
                                ? 'bg-blue-500 text-white'
                                : 'text-gray-700',
                              'block px-4 py-2 text-sm',
                            )}
                          >
                            {ticket.bug_type === 'bug'
                              ? 'Mark it as Resolved'
                              : 'mark it as completed'}
                          </button>
                        )}
                      </Menu.Item>
                    )}
                  </>
                )}
                {userType === 'qa' && (
                  <>
                    <Menu.Item>
                      {({ active }) => (
                        <button
                          type="button"
                          onClick={() => setIsOpenTicket(true)}
                          className={classNames(
                            active ? 'bg-blue-500 text-white' : 'text-gray-700',
                            'block px-4 py-2 text-sm',
                          )}
                        >
                          Edit Ticket
                        </button>
                      )}
                    </Menu.Item>
                    <Menu.Item>
                      {({ active }) => (
                        <button
                          type="button"
                          onClick={handleDeleteTicket}
                          className={classNames(
                            active ? 'bg-blue-500 text-white' : 'text-gray-700',
                            'block px-4 py-2 text-sm',
                          )}
                        >
                          Delete Ticket
                        </button>
                      )}
                    </Menu.Item>
                  </>
                )}
              </Menu.Items>
            </Transition>
          </Menu>
        </div>
      </div>
      <div className="w-[calc(100%-30px)] mx-auto bg-whitetickets mt-8 border border-blue-500 max-h-[600px] overflow-auto">
        <div className="bg-white">
          <table className="styled-table" style={{ tableLayout: 'fixed' }}>
            <colgroup>
              <col style={{ width: '25%' }} />
              <col style={{ width: '25%' }} />
              <col style={{ width: '25%' }} />
              <col style={{ width: '25%' }} />
            </colgroup>
            <thead>
              <tr>
                <th>Title</th>
                <th>Deadline</th>
                <th>Type</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {ticket && ticket !== 'undefined' ? (
                <tr key={ticket.id} className="sm:text-[1.3rem]">
                  <td className="project-name">
                    {ticket.title}
                  </td>
                  <td>{ticket.deadline}</td>
                  <td>{ticket.bug_type}</td>
                  <td>
                    <p className={classNames(
                      ticket.status === 'open' && 'bg-green-500 text-white px-4 rounded-xl w-20',
                      ticket.status === 'started' && 'bg-red-500 text-white px-4 rounded-xl w-20',
                      'bg-blue-500 text-white px-4 rounded-xl w-24 ',
                    )}
                    >
                      {ticket.status}
                    </p>
                  </td>
                </tr>
              ) : (
                <tr>
                  <td colSpan="4">There are no tickets.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
        <div className=" bg-white flex flex-col gap-4 p-4">
          <strong>description</strong>
          <p className="w-[400px] sm:text-[1.3rem]">{ticket.description}</p>
        </div>
        <div className=" bg-white flex flex-col gap-4 p-4">
          <strong>attachement</strong>
          <button
            type="button"
            onClick={() => setIsOpen(true)}
            className="p-0 m-0 border-0 bg-transparent"
          >
            <img className="w-[100px] h-[50px] hover:scale-90 transition-scale duration-200" src={ticket.screenshot_url} alt="screenshot" />
          </button>
        </div>
      </div>
      <ScreenshotPopup
        isOpen={isOpen}
        setIsOpen={() => setIsOpen(false)}
        screenshotUrl={ticket.screenshot_url}
      />
      <TicketForm
        isOpen={isOpenTicket}
        setIsOpen={() => setIsOpenTicket(false)}
        creatorId={userId}
        ticket={ticket}
        formType={ticket ? 'edit' : 'create'}
      />
    </>
  );
};

export default Ticket;
