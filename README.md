# axis-frontend

This React app is the Axis UI and integrates with our axis-backend.

---

## 🔵 Tolmann - Axis 2.0 Front-end Server setup

You should have Nodejs version 16 or higher installed in the server.

If Nodejs is not installed you should install version 18.15.0 from https://nodejs.org/en

---

## 🔵 Clonning and installing the app

Install **Git** from https://git-scm.com/ by clicking on the Download for Windows button inside the image with a computer monitor and current stable version number. You will need git to perform several activities, mainly by using **Git Bash**.

Once installe, run **Git Bash** in order to open the _bash terminal_. (To find Git Bash app just click on Start icon in Windows machine and type **git bash**.)

Here is where you are going to perform the app setup and run it.

You will need to have a folder called **webserver** in drive **C:**.

**Tip:** _Always press Enter after each command you are requested to type._

In order to do that, change to drive **C:** by typing:

```bash
cd /c/
```

After that, just type

```bash
mkdir webserver
```

This command will create (if not exists) the folder **webserver** in **C:** drive

If the folder already exists you should get the following error message:

```bash
mkdir: cannot create directoary 'webserver':: File exists
```

Don't worry if you got the message. This is expected and nothing wrong will happen to the process.

You have now to move inside that directory by doing:

```bash
cd webserver
```

Now you have to clone the GitHub repository by runing the following command:

```bash
git clone https://github.com/omelendrez/axis-frontend.git
```

Now you have to move inside the new folder created by the clone action as follows:

```bash
cd axis-frontend
```

You should run now:

```bash
npm ci
npm run build
```

This command lines will install all the app dependencies and then build the package for execution in production.

You will find a file called `.env.example` in that folder.

You have to copy that file in the same folder with a different name. Just name it `.env`

Now you have to edit that `.env` file and check the content.

```bash
VITE_API_URL="http://192.168.0.163:3000/api/"
```

Now you need to set the actual axis-backend url.

The values correspond to the **Axis** server machine we want have installed the database.

You can get that by typing `ipconfig` in **gitbash** or **command** terminals.

Once the file has been created and the right url have been entered in this file, you can run the UI server by typing:

```bash
npm start
```

The app will show in the terminal when the server is ready.
If everything concludes without errors, you should see the last message as follows:

![Screenshot 2023-04-18 085306](https://user-images.githubusercontent.com/7883563/232769575-32a0c721-d4b7-4b9d-9ab1-a2283be0b789.png)

If this is the case, the new version of Axis UI is already running in the server.

The app is running in the cloud with this path: https://axis-tolmann.vercel.app

## Node version

We use `v20.9.0` and we will not upgrade yet due to a warning caused by the issue below which shows up starting with `v21.0.0`.

https://github.com/forcedotcom/cli/issues/2535

## Application Flow

```mermaid
graph TD;
    Admin-->Frontdesk;
    Admin-->CANCEL;
    Frontdesk-->Admin;
    Frontdesk-->Medic;
    Frontdesk-->CANCEL;
    Medic-->CANCEL;
    Medic-->TrainingCoordinator;
    TrainingCoordinator-->Medic;
    TrainingCoordinator-->CANCEL;
    TrainingCoordinator-->Accounts;
    Accounts-->MD;
    Accounts-->CANCEL;
    MD-->Printer;
    MD-->CANCEL;
    Printer-->COMPLETED;
```
