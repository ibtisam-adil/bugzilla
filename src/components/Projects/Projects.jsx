import { useEffect, useState } from 'react';
// import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import { useDispatch, useSelector } from 'react-redux';
// import { Link } from 'react-router-dom';
import { fetchProjects } from '../../redux/projects/ProjectSlice';
import ProjectForm from './ProjectForm';

const Project = () => {
  const dispatch = useDispatch();

  const { projects, error, loading } = useSelector((state) => state.projects);
  const userType = useSelector((state) => state.auth.user.user_type);
  const isLogin = useSelector((state) => state.auth.isLogin);

  const [isOpen, setIsOpen] = useState(false);
  const [filteredProjects, setFilteredProjects] = useState(projects);

  useEffect(() => {
    if (isLogin) {
      dispatch(fetchProjects());
    }
  }, [dispatch, isLogin]);

  useEffect(() => {
    if (projects && projects.length > 0) {
      setFilteredProjects(projects);
    }
  }, [projects]);

  // const renderSkeletonRows = () => {
  //   const skeletonRows = [];
  //   for (let i = 0; i < 5; i += 1) {
  //     skeletonRows.push(
  //       <tr key={i}>
  //         <td colSpan="4">
  //           <Skeleton />
  //         </td>
  //       </tr>
  //     );
  //   }
  //   return skeletonRows;
  // };

  return (
    <>
      <section className="projects-section">
        <div className="projects border border-blue-500 px-10 text-2xl">
          <div className="project-page flex justify-between py-10 text-3xl">
            <h3> Projects </h3>
            {userType && userType === 'manager' && (
              <button
                type="button"
                onClick={() => setIsOpen(true)}
                className="btn new-project transition-transform duration-200 hover:scale-110"
                // to="/projects/new"
              >
                Create Project
              </button>
            )}
          </div>
          <div className="table-body max-h-[500px] overflow-auto">
            <table className="styled-table">
              <colgroup>
                <col style={{ width: '18%' }} />
                <col style={{ width: '50%' }} />
                <col style={{ width: '18%' }} />
                <col style={{ width: '18%' }} />
              </colgroup>
              <thead className="text-2xl">
                <tr>
                  <th>Project</th>
                  <th>Description</th>
                  <th>Creator</th>
                  <th>Details</th>
                </tr>
              </thead>
              <tbody>
                {error && (
                  <tr>
                    <td colSpan="4">{error}</td>
                  </tr>
                )}
                {!error
                && !loading
                && filteredProjects
                && filteredProjects.map((project) => (
                  <tr className="sm:text-[1.3rem] hover:bg-blue-500 hover:text-white duration-200 transition-all" key={project.id}>
                    <td className="">{project.name}</td>
                    <td className="project-description">{project.description}</td>
                    <td>John</td>
                    <td>
                      {/* <Link
                        className="btn"
                        href={`/projects/${project.id}`}
                        state={{ id: project.id }}
                      >
                        Details
                      </Link> */}
                    </td>
                  </tr>
                ))}
                {!error && !loading && filteredProjects.length === 0 && (
                  <tr>
                    <td className="pl-[5px]" colSpan="4">There are no projects.</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
        <ProjectForm
          isOpen={isOpen}
          setIsOpen={() => setIsOpen(false)}
          title="Create New Project"
          // project={}
        />
      </section>
    </>
  );
};

export default Project;
