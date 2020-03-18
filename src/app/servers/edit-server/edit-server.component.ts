import { Component, OnInit } from "@angular/core";

import { ServersService } from "../servers.service";
import { Router, ActivatedRoute } from "@angular/router";

@Component({
  selector: "app-edit-server",
  templateUrl: "./edit-server.component.html",
  styleUrls: ["./edit-server.component.css"]
})
export class EditServerComponent implements OnInit {
  server: { id: number; name: string; status: string };
  serverName = "";
  serverStatus = "";

  constructor(
    private serversService: ServersService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.server = this.serversService.getServer(1);
    this.serverName = this.server.name;
    this.serverStatus = this.server.status;

    console.log(this.route.snapshot.queryParams["editmode"]);
    console.log(this.route.snapshot.fragment);

    //Observables as for params
    //this.route.queryParams.subscribe(...todo)
    //this.route.fragment.subscribe(...todo)
  }

  onUpdateServer() {
    this.serversService.updateServer(this.server.id, {
      name: this.serverName,
      status: this.serverStatus
    });
  }

  loadServer(id: number) {
    this.router.navigate(["/servers", id, "edit"], {
      queryParams: { editmode: true },
      fragment: "loading"
    });
  }
}
