import chartServices from '../services/chartServices';

interface Props {
  id: number; 
  onDeleteSuccess: () => void; 
}

const DeleteChart: React.FC<Props> = ({ id, onDeleteSuccess }) => {
  const handleDelete = () => {
    chartServices.remove(id)
      .then(() => {
        console.log('Chart deleted successfully');
        onDeleteSuccess(); 
      })
      .catch(error => {
        console.error('Error deleting chart:', error);
      });
  };

  return (
    <button onClick={handleDelete}>Delete</button>
  );
};

export default DeleteChart;
