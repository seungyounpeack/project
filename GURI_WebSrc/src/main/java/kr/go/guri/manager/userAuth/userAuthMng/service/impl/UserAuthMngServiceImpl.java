package kr.go.guri.manager.userAuth.userAuthMng.service.impl;

import java.io.IOException;
import java.sql.SQLException;
import java.util.List;
import java.util.Map;

import javax.annotation.Resource;

import org.springframework.stereotype.Service;

import kr.go.guri.manager.userAuth.userAuthMng.service.UserAuthMngService;
/**
 * 사용자 권한 설정 serviceImpl 클래스
* @author 김부권
* @since 2022. 06. 21.
* @version 1.0
* @see
*
* <pre>
* << 개정이력(Modification Information) >>
*
*     수정일                         수정자                            수정내용
*  -----------       -------------   ----------------------
*  2022.06.21.           김부권                          최초 생성
*   
* </pre>
*/

@Service("userAuthMngService")
public class UserAuthMngServiceImpl implements UserAuthMngService{
	
	@Resource( name = "userAuthMngMapper")
	private UserAuthMngMapper userAuthMngMapper;

	@Override
	public List<Map<String, Object>> selectUserList(Map<String, Object> param) throws SQLException , IOException {
		// TODO Auto-generated method stub
		return userAuthMngMapper.selectUserList(param);
	}

	@Override
	public List<Map<String, Object>> selectUserRoleList(Map<String, Object> param) throws SQLException , IOException {
		// TODO Auto-generated method stub
		return userAuthMngMapper.selectUserRoleList(param);
	}

	@Override
	public int insertUserRoleInfo(Map<String, Object> param) throws SQLException , IOException {
		// TODO Auto-generated method stub
		return userAuthMngMapper.insertUserRoleInfo(param);
	}
	
	@Override
	public int deleteUserRoleInfo(Map<String, Object> param) throws SQLException , IOException {
		// TODO Auto-generated method stub
		return userAuthMngMapper.deleteUserRoleInfo(param);
	}

	@Override
	public int selectUserRoleInfo(Map<String, Object> param) throws SQLException , IOException {
		// TODO Auto-generated method stub
		return userAuthMngMapper.selectUserRoleInfo(param);
	}
	
	@Override
	public List<Map<String, Object>> selectPosList() throws SQLException , IOException {
		// TODO Auto-generated method stub
		return userAuthMngMapper.selectPosList();
	}

	@Override
	public List<Map<String, Object>> selectUpperDetpList() throws SQLException , IOException {
		// TODO Auto-generated method stub
		return userAuthMngMapper.selectUpperDetpList();
	}

	@Override
	public List<Map<String, Object>> selectSectionDeptList(Map<String, Object> param) throws SQLException , IOException {
		// TODO Auto-generated method stub
		return userAuthMngMapper.selectSectionDeptList(param);
	}
	
	
}
