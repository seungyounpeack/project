package kr.go.guri.login.service.impl;

import java.io.IOException;
import java.sql.SQLException;
import java.util.List;
import java.util.Map;

import javax.annotation.Resource;

import org.springframework.stereotype.Service;

import egovframework.rte.fdl.cmmn.EgovAbstractServiceImpl;
import kr.go.guri.login.service.LoginService;

/**
 * 로그인 Service Implement 클래스
 * @author 김부권
 * @since 2021. 10. 07.
 * @version 1.0
 * @see
 *
 * <pre>
 * << 개정이력(Modification Information) >>
 *
 *  수정일			수정자			수정내용
 *  -------    		-------------   ----------------------
 *  2021.10.07.   	김부권          최초 생성
 *   
 * </pre>
 */

@Service("loginService")
public class LoginServiceImpl extends EgovAbstractServiceImpl implements LoginService {

	@Resource(name = "loginMapper")
	private LoginMapper loginMapper;

	@Override
	public List<Map<String, Object>> selectSearchInfo(Map<String, Object> param) throws IOException, SQLException {
		// TODO Auto-generated method stub
		return loginMapper.selectSearchInfo(param);
	}

	@Override
	public int selectCheckUserInfo(Map<String, Object> param) throws IOException, SQLException {
		// TODO Auto-generated method stub
		return loginMapper.selectCheckUserInfo(param);
	}

	@Override
	public int insertUserInfo(Map<String, Object> param) throws IOException, SQLException {
		// TODO Auto-generated method stub
		return loginMapper.insertUserInfo(param);
	}

	@Override
	public Map<String, Object> selectUserLogin(Map<String, Object> param) throws IOException, SQLException {
		// TODO Auto-generated method stub
		return loginMapper.selectUserLogin(param);
	}


	
}
