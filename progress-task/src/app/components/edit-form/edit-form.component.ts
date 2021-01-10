import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { User } from '../models/IUser.model';

@Component({
  selector: 'kendo-grid-edit-form',
  templateUrl: './edit-form.component.html',
  styleUrls: ['./edit-form.component.css']
})
export class EditFormComponent {

  public active = false;
    public editForm: FormGroup = new FormGroup({
        id: new FormControl(),
        first_name: new FormControl('', Validators.required),
        last_name: new FormControl('', Validators.required),
        country: new FormControl('', Validators.required),
        email: new FormControl('', Validators.compose([Validators.required,Validators.email])),
        // ip_address: new FormControl(Validators.required),
        //Add a validator for amount
        currency: new FormControl('',Validators.required),
        amount: new FormControl(Validators.required),
    });

    @Input() public isNew = false;

    @Input() public set model(user: User) {
        this.editForm.reset(user);

        this.active = user !== undefined;
    }

    @Output() cancel: EventEmitter<any> = new EventEmitter();
    @Output() save: EventEmitter<User> = new EventEmitter();

    public onSave(e): void {
        e.preventDefault();
        this.save.emit(this.editForm.value);
        this.active = false;
    }

    public onCancel(e): void {
        e.preventDefault();
        this.closeForm();
    }

    public closeForm(): void {
        this.active = false;
        this.cancel.emit();
    }

  // constructor() { }

  // ngOnInit(): void {
  // }

}
