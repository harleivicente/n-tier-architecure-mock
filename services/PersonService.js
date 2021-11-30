import {
    PersonRepository,
    PersonFactRepository,
    PersonNameRepository,
    PersonSearchWordRepository,
    PlaceRepository,
    UnitOfWork
} from '../repositories';
import { withMetrics } from '../metrics';


const addPerson = async(familyTreeId, personName, moreArgs) => {

    const unitOfWork = new UnitOfWork();
    const transaction = unitOfWork.getTransaction();
    const personFactRepository = new PersonFactRepository(transaction);
    const personNameRepository = new PersonNameRepository(transaction);
    const personSearchWordRepository = new PersonSearchWordRepository(transaction);
    const personRepository = new PersonRepository(transaction);
    const placeRepository = new PlaceRepository(transaction);

    try {
        const person = await personRepository.addPerson();
        await personNameRepository.addPersonName(person, name);
        await personFactRepository.addFacts(familyTreeId, personId, "NAME", moreArgs.name);
        await personFactRepository.addFacts(familyTreeId, personId, "DEATH", moreArgs.death);
        await personSearchWordRepository.addSearchWord(personId, "Name");
        await placeRepository.addPlace(familyTreeId, personId, moreArgs.place);
        unitOfWork.commit();
        
    } catch (error) {
        unitOfWork.rollback();
    }

}


export default {
    addPerson: withMetrics(addPerson)
}