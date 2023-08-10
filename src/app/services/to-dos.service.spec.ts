import { TestBed } from '@angular/core/testing';
import { FilterEnum } from '../types/filter.enum';
import { ToDosService } from './to-dos.service';

describe('ToDosService', () => {
  let toDosService: ToDosService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ToDosService],
    });
    toDosService = TestBed.inject(ToDosService);
    toDosService.addToDo('This is a new toDo one');
    toDosService.addToDo('This is a new toDo two');
    toDosService.addToDo('This is a new toDo three');
    toDosService.addToDo('This is a new toDo four');
    toDosService.addToDo('This is a new toDo five');
  });

  it('should be created', () => {
    expect(toDosService).toBeTruthy();
  });

  //Test toggleToDo() function;
  it('should toggle item "isCompleted" property value from true to false and vice versa', () => {
    const itemId = toDosService.toDosSignal()[0].id;
    const isCompletedValueBefore = toDosService.toDosSignal()[0].isCompleted;
    toDosService.toggleToDo(itemId); //First toggling;
    const isCompletedValueAfter = toDosService.toDosSignal()[0].isCompleted;
    const firstTogglingResult = isCompletedValueBefore !== isCompletedValueAfter;
    toDosService.toggleToDo(itemId); //Second toggling;
    const isCompletedValueAfterSecondToggling = toDosService.toDosSignal()[0].isCompleted;
    const secondTogglingResult = isCompletedValueBefore === isCompletedValueAfterSecondToggling;
    expect(firstTogglingResult).toBeTrue();
    expect(secondTogglingResult).toBeTrue();
  });

  //Test setFilter() function;
  it('should set "filterSignal()" value', () => {
    const filterEnum = FilterEnum;
    toDosService.setFilter(filterEnum.ACTIVE);
    const filterValueFirst = toDosService.filterSignal();
    expect(filterValueFirst).toBe('active');
    toDosService.setFilter(filterEnum.ALL);
    const filterValueSecond = toDosService.filterSignal();
    expect(filterValueSecond).toBe('all');
    toDosService.setFilter(filterEnum.COMPLETED);
    const filterValueThird = toDosService.filterSignal();
    expect(filterValueThird).toBe('completed');
  });

  //Test does the filteredToDos() signal returns the correct data;
  it('should render filtered signals according "filterSignal()" value', () => {
    const filterEnum = FilterEnum;
    const secondToDo = toDosService.toDosSignal()[1];
    toDosService.toggleToDo(secondToDo.id);
    const fourthToDo = toDosService.toDosSignal()[3];
    toDosService.toggleToDo(fourthToDo.id);
    toDosService.setFilter(filterEnum.ALL);
    const resultAll = toDosService.filteredToDos();
    expect(resultAll.length).toBe(5);
    toDosService.setFilter(filterEnum.ACTIVE);
    const resultActive = toDosService.filteredToDos();
    expect(resultActive.length).toBe(3);
    toDosService.setFilter(filterEnum.COMPLETED);
    const resultCompleted = toDosService.filteredToDos();
    expect(resultCompleted.length).toBe(2);
  });

  //Test addToDo() function;
  it('should add toDo item to the "toDosSignal()"', () => {
    const beforeAddingArrayLength = toDosService.toDosSignal().length;
    toDosService.addToDo('This is a new toDo');
    const afterAddingArrayLength = toDosService.toDosSignal().length;
    const result = afterAddingArrayLength - beforeAddingArrayLength;
    expect(result).toBe(1);
  });

  //Test editToDo() function;
  it('should change selected toDo item title', () => {
    const originalItem = toDosService.toDosSignal()[0];
    const newTitle = 'This is a modified item Title';
    toDosService.editToDo(originalItem.id, newTitle);
    const modifiedItem = toDosService.toDosSignal()[0];
    expect(modifiedItem.title).toBe(newTitle);
  });

  //Test generateRandomId() function;
  it('should generate unique Id string for toDo item', () => {
    let i = 0;
    let idsArray: string[] = [];
    while (i < 5) {
      idsArray.push(toDosService['generateRandomId']());
      /*This strange syntax of calling PRIVATE ['generateRandomId'] method presented to avoid error:
      "Property 'generateRandomId' is private and only accessible within class 'ToDosService'";*/
      i++;
    }
    const allUnique = (array: string[]) => array.length === new Set(array).size;
    const result = allUnique(idsArray);
    expect(result).toBeTrue();
  });

  //Test deleteToDo function;
  it('should remove toDo item from the "toDosSignal()"', () => {
    const beforeDeletingArrayLength = toDosService.toDosSignal().length;
    const itemId = toDosService.toDosSignal()[3].id;
    toDosService.deleteToDo(itemId);
    const afterRemovingArrayLength = toDosService.toDosSignal().length;
    const result = beforeDeletingArrayLength - afterRemovingArrayLength;
    expect(result).toBe(1);
  });

  //Test toggleAllToDos() function;
  it('should toggle all items "isCompleted" property value from true to false and vice versa', () => {
    const beforeToggling = toDosService.toDosSignal().every(element => !element.isCompleted);
    toDosService.toggleAllToDos(true);
    const afterToggling = toDosService.toDosSignal().every(element => element.isCompleted);
    expect(beforeToggling).toBe(afterToggling);
  });

  //Test deleteCompletedToDos() function;
  it('should remove all toDos where "isCompleted" property value is "true"', () => {
    toDosService.toggleAllToDos(true);
    toDosService.deleteCompletedToDos();
    const result = toDosService.toDosSignal();
    expect(result.length).toBe(0);
  });
});
