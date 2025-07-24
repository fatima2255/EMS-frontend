import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

const TaskTarget = ({ completedTasks, totalTasks }) => {
  const percentage = totalTasks > 0 ? (completedTasks / totalTasks) * 100 : 0;

  return (
    <div className="bg-white rounded-lg shadow p-4 w-full">
      <h3 className="font-bold text-black mb-2">Complete Task Target</h3>
      
      {percentage === 0 ? (
        <div className="text-center text-gray-400 mt-6">No tasks completed yet</div>
      ) : (
        <div className="w-24 h-24 mx-auto">
          <CircularProgressbar
            value={percentage}
            text={`${Math.round(percentage)}%`}
            styles={buildStyles({
              pathColor: '#facc15', // yellow
              textColor: '#000',
              trailColor: '#fefce8', // light yellow
              textSize: '18px',
            })}
          />
        </div>
      )}

      <p className="text-center text-sm mt-2 text-gray-600">
        {completedTasks} of {totalTasks} tasks completed
      </p>
    </div>
  );
};

export default TaskTarget;
