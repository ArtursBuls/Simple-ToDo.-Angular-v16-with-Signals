import { TestBed } from '@angular/core/testing';
import { ToDosService } from './to-dos.service';
import { FilterEnum } from '../types/filter.enum';

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
  });

  it('should be created', () => {
    expect(toDosService).toBeTruthy();
  });

  //Test addToDo() function;
  it('should add toDo item to the "ToDos" array', () => {
    const beforeAddingArrayLength = toDosService.toDosSignal().length;
    toDosService.addToDo('This is a new toDo');
    const afterAddingArrayLength = toDosService.toDosSignal().length;
    const result = beforeAddingArrayLength < afterAddingArrayLength;
    expect(result).toBeTrue();
  });

  //Test editToDo() function;
  it('should change selected toDo item title', () => {
    const originalItemTitle = toDosService.toDosSignal()[0];
    toDosService.editToDo(originalItemTitle.id, 'This is a new item Title');
    const modifiedItemTitle = toDosService.toDosSignal()[0];
    const result = originalItemTitle !== modifiedItemTitle;
    expect(result).toBeTrue();
  });

  //Test generateRandomId() function;
  it('should generate unique Id string for toDo item', () => {
    let i = 0;
    let idsArray: string[] = [];
    while (i < 5) {
      idsArray.push(toDosService.generateRandomId());
      i++;
    }
    const allUnique = (array: string[]) => array.length === new Set(array).size;
    const result = allUnique(idsArray);
    expect(result).toBeTrue();
  });

  //Test deleteToDo function;
  it('should remove toDo item from the "ToDos" array', () => {
    const beforeDeletingArrayLength = toDosService.toDosSignal().length;
    const itemId = toDosService.toDosSignal()[0].id;
    toDosService.deleteToDo(itemId);
    const afterRemovingArrayLength = toDosService.toDosSignal().length;
    const result = beforeDeletingArrayLength > afterRemovingArrayLength;
    expect(result).toBeTrue();
  });

  //Test toggleToDo() function;
  it('should toggle item "isCompleted" property value from true to false and vice versa', () => {
    const itemId = toDosService.toDosSignal()[0].id;
    const isCompletedValueBefore = toDosService.toDosSignal()[0].isCompleted;
    //Toggle "isCompleted" property value to true(initial value is "false");
    toDosService.toggleToDo(itemId);
    const isCompletedValueAfter = toDosService.toDosSignal()[0].isCompleted;
    const firstTogglingResult = isCompletedValueBefore !== isCompletedValueAfter;
    //Toggle same item "isCompleted" property value back to false;
    toDosService.toggleToDo(itemId);
    const isCompletedValueAfterSecondToggle = toDosService.toDosSignal()[0].isCompleted;
    const secondTogglingResult = isCompletedValueBefore === isCompletedValueAfterSecondToggle;
    expect(firstTogglingResult).toBeTrue();
    expect(secondTogglingResult).toBeTrue();
  });

  //Test toggleAllToDos() function;
  it('should toggle all items "isCompleted" property value from true to false and vice versa', () => {
    const itemId = toDosService.toDosSignal()[0].id;
    const isCompletedValueBefore = toDosService.toDosSignal()[0].isCompleted;
    //Toggle "isCompleted" property value to true(initial value is "false");
    toDosService.toggleToDo(itemId);
    const isCompletedValueAfter = toDosService.toDosSignal()[0].isCompleted;
    const firstTogglingResult = isCompletedValueBefore !== isCompletedValueAfter;
    //Toggle same item "isCompleted" property value back to false;
    toDosService.toggleToDo(itemId);
    const isCompletedValueAfterSecondToggle = toDosService.toDosSignal()[0].isCompleted;
    const secondTogglingResult = isCompletedValueBefore === isCompletedValueAfterSecondToggle;
    expect(firstTogglingResult).toBeTrue();
    expect(secondTogglingResult).toBeTrue();
  });

  //Test setFilter() function;
  it('should set filter signal value', () => {
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
    const firstToDos = toDosService.toDosSignal()[0];
    const secondToDos = toDosService.toDosSignal()[1];
    toDosService.toggleToDo(secondToDos.id);
    const thirdToDos = toDosService.toDosSignal()[2];
    const fourthToDos = toDosService.toDosSignal()[3];
    toDosService.toggleToDo(fourthToDos.id);
    toDosService.setFilter(filterEnum.ALL);
    const resultAll = toDosService.filteredToDos();
    expect(resultAll.length).toBe(4);
    toDosService.setFilter(filterEnum.ACTIVE);
    const resultActive = toDosService.filteredToDos();
    expect(resultActive.length).toBe(2);
    toDosService.setFilter(filterEnum.COMPLETED);
    const resultCompleted = toDosService.filteredToDos();
    expect(resultCompleted.length).toBe(2);
  });

  //Test deleteCompletedToDos() function;
  it('should remove all toDos with "isCompleted" property value "true"', () => {
    toDosService.toggleAllToDos(true);
    toDosService.deleteCompletedToDos();
    const result = toDosService.toDosSignal();
    expect(result.length).toBe(0);
  });
});
