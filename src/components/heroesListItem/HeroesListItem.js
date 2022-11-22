import { Transition } from "react-transition-group";
import { useDeleteHeroMutation } from '../../api/apiSlice';

const HeroesListItem = ({id, name, description, element}) => {

    let elementClassName;

    const [deleteHero] = useDeleteHeroMutation();

    switch (element) {
        case 'Огонь':
            elementClassName = 'bg-danger bg-gradient';
            break;
        case 'Вода':
            elementClassName = 'bg-primary bg-gradient';
            break;
        case 'Воздух':
            elementClassName = 'bg-warning bg-gradient';
            break;
        case 'Земля':
            elementClassName = 'bg-success bg-gradient';
            break;
        default:
            elementClassName = 'bg-secondary bg-gradient';
    }

    return (
        <Transition in={name} timeout={500}>
            {state => (
                <li className={`card flex-row mb-4 shadow-lg text-white ${elementClassName} ${state}`}>
                    <img src="http://www.stpaulsteinbach.org/wp-content/uploads/2014/09/unknown-hero.jpg" 
                        className="img-fluid w-25 d-inline" 
                        alt="unknown hero" 
                        style={{'objectFit': 'cover'}}/>
                    <div className="card-body">
                        
                        <h3 className="card-title">{name}</h3>
                        <p className="card-text">{description}</p>
                    </div>
                    <span 
                        className="position-absolute top-0 start-100 translate-middle badge border rounded-pill bg-light"
                        onClick={e => deleteHero(id)}>
                        <button type="button" className="btn-close btn-close" aria-label="Close"></button>
                    </span>
                </li>
            )}
            
        </Transition>
        
    )
}

export default HeroesListItem;