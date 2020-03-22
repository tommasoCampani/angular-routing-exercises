import { Component, OnInit } from "@angular/core";

import { ServersService } from "../servers.service";
import { Router, ActivatedRoute, Params } from "@angular/router";

@Component({
  selector: "app-edit-server",
  templateUrl: "./edit-server.component.html",
  styleUrls: ["./edit-server.component.css"]
})
export class EditServerComponent implements OnInit {
  server: { id: number; name: string; status: string };
  serverName: string = "";
  serverStatus: string = "";
  allowEdit: string = "1";

  constructor(
    private serversService: ServersService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.server = this.serversService.getServer(1);
    this.serverName = this.server.name;
    this.serverStatus = this.server.status;

    this.allowEdit = this.route.snapshot.queryParams["allowEdit"];

    //Observables as for params
    this.route.queryParams.subscribe((queryParams: Params) => {
      this.allowEdit = queryParams["allowEdit"];
    });

    //To get access to fragment query parameter
    //const fragValue = this.route.snapshot.fragment;

    //To get access to fragment query parameter via observable
    //this.route.fragment.subscribe((params: Params) => {//todo})
  }

  onUpdateServer() {
    this.serversService.updateServer(this.server.id, {
      name: this.serverName,
      status: this.serverStatus
    });
  }

  loadServer(id: number) {
    this.router.navigate(["/servers", id, "edit"], {
      queryParams: { allowEdit: true },
      fragment: "loading"
    });
  }
}
