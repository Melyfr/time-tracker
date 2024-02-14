import { SubmitHandler, useForm } from "react-hook-form";
import { getAccessToken } from "../App";
import { tasksApi } from "../store/services/TasksApi";
import '../style/TaskCard.css';
import '../style/AddCard.css'

type CardInputs = {
    name: string
    bgc: string
  }

type AddCardProps = {
    setAddMode: (params: boolean) => void;
}

const AddCard:React.FC<AddCardProps> = ({setAddMode}) => {
    const [saveTask, {}] = tasksApi.useSaveTaskMutation();
    const {register, watch, handleSubmit} = useForm<CardInputs>({
        defaultValues: {
            name: '',
            bgc: '#ffffff'
        }
    });

    const onSubmit: SubmitHandler<CardInputs> = async(inputs) => {
        saveTask({
            id: -1,
            name: inputs.name,
            bgc: inputs.bgc,
            time: {day: 0, week: 0, month: 0},
            authorID: getAccessToken(),
        });
        setAddMode(false);
    };
   
    return (
        <form onSubmit={handleSubmit(onSubmit)} className="task-card" style={{backgroundColor: `${watch('bgc')}`}}>
            <div className='task-card__content'>
                <input {...register("name", { required: true })} className='task-card__title add-card__title' type='text' placeholder='Write a title'/>
                <label className="add-card__label">
                    Pick a color:
                    <input {...register("bgc", { required: true })} type='color' className="add-card__color"/>
                </label>
                <div className="task-card__body">
                    <div className="task-card__btns">
                        <input className="task-card__toggle add-card__save" value='Save' type="submit"/>
                        <div className="task-card__toggle" onClick={() => setAddMode(false)}>Cancel</div>
                    </div>
                </div>
            </div>
        </form>
    );
}

export default AddCard;