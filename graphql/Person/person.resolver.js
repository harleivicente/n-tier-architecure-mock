import { addPerson } from '../../services/PersonService';

export default PersonResolver = {

    person: async () => {},

    addPerson: async (familyTreeId, name) => {
        await addPerson(familyTreeId, name);
    }

};