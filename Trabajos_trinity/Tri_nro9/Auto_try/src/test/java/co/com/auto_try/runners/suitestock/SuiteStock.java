package co.com.auto_try.runners.suitestock;

import co.com.auto_try.runners.AutenRunnCreCatego;
import co.com.auto_try.runners.AutenRunnEditCatego;
import co.com.auto_try.runners.AutenRunnEliminCatego;
import co.com.auto_try.runners.AutenRunnInSesion;
import org.junit.runner.RunWith;
import org.junit.runners.Suite;


@RunWith(Suite.class)
@Suite.SuiteClasses({
        AutenRunnCreCatego.class,
        AutenRunnEditCatego.class,
        AutenRunnEliminCatego.class
})

public class SuiteStock {

}
