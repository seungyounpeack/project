package kr.go.guri.manager.userAuth.userAuthSolution.service.impl;

import java.io.IOException;
import java.sql.SQLException;
import java.util.List;
import java.util.Map;

import javax.annotation.Resource;

import org.springframework.stereotype.Service;

import kr.go.guri.manager.userAuth.userAuthSolution.service.UserAuthSolutionService;

@Service("userAuthSolutionService")
public class UserAuthSolutionServiceImpl implements UserAuthSolutionService{
	
	@Resource( name = "userAuthSolutionMapper")
	private UserAuthSolutionMapper userAuthSolutionMapper;
	
	/**
	 * 솔루션 권한 부여하기	
	 */
	@Override
	public int selectInsertSolutionAuth(Map<String, Object> param) throws IOException, SQLException {
		// TODO Auto-generated method stub
		return userAuthSolutionMapper.selectInsertSolutionAuth(param);
	}
	
	
	/**
	 * 솔루션 권한 해제하기	
	 */
	@Override
	public int selectDeleteSolutionAuth(Map<String, Object> param) throws IOException, SQLException {
		// TODO Auto-generated method stub
		return userAuthSolutionMapper.selectDeleteSolutionAuth(param);
	}
	
	/**
	 * 솔루션 사용자 목록 조회	
	 */
	@Override
	public List<Map<String, Object>> selectSolutionUserList(Map<String, Object> param) throws IOException, SQLException {
		// TODO Auto-generated method stub
		return userAuthSolutionMapper.selectSolutionUserList(param);
	}
	
	/**
	 *  사용자 목록 조회	
	 */
	@Override
	public List<Map<String, Object>> selectUserList(Map<String, Object> param) throws IOException, SQLException {
		// TODO Auto-generated method stub
		return userAuthSolutionMapper.selectUserList(param);
	}

	/**
	 * solution user권한 cnt
	 */
	@Override
	public int selectSolutionUserCnt(Map<String, Object> param) throws IOException, SQLException {
		return userAuthSolutionMapper.selectSolutionUserCnt(param);
	}
	
}
